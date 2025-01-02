'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { fetchCommentsByPostId, clearComments } from '../store/commentSlice';
import { fetchPostByPostId, deletePost, updatePost } from '../store/postSlice';
import { RootState } from '../store';
import { Button, TextField, Box, Typography, CircularProgress, Snackbar } from '@mui/material';
import { useAppDispatch } from '../hooks';

const PostDetails: React.FC = () => {
	const router = useRouter();
	const { id } = router.query;
	const dispatch = useAppDispatch();
	const {
		comments,
		loading: commentsLoading,
		error: commentsError,
	} = useSelector((state: RootState) => state.comments);
	const {
		post,
		loading: postLoading,
		error: postError,
	} = useSelector((state: RootState) => state.posts);
	const [isEditingPost, setIsEditingPost] = useState(false);
	const [postTitle, setPostTitle] = useState('');
	const [postContent, setPostContent] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	useEffect(() => {
		if (id) {
			dispatch(clearComments());
			dispatch(fetchCommentsByPostId(Number(id)));
			dispatch(fetchPostByPostId(Number(id)));
		}
	}, [dispatch, id]);

	useEffect(() => {
		if (post) {
			setPostTitle(post.title);
			setPostContent(post.content);
		}
	}, [post]);

	const handlePostUpdate = async () => {
		if (id) {
			try {
				await dispatch(updatePost({ postId: Number(id), title: postTitle, content: postContent }));
				setIsEditingPost(false);
				setSnackbarMessage('Post updated successfully');
			} catch (error) {
				setSnackbarMessage('Failed to update post');
				console.error('Failed to update post:', error);
			} finally {
				setOpenSnackbar(true);
				dispatch(fetchPostByPostId(Number(id)));
			}
		}
	};

	const handlePostDelete = async () => {
		if (id) {
			try {
				await dispatch(deletePost(Number(id)));
				setSnackbarMessage('Post deleted successfully');
				router.push('/');
			} catch (error) {
				setSnackbarMessage('Failed to delete post');
				console.error('Failed to delete post:', error);
			} finally {
				setOpenSnackbar(true);
			}
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	if (commentsLoading || postLoading) {
		return <CircularProgress />;
	}

	if (commentsError && commentsError !== 'Request failed with status code 404') {
		return <Typography color="error">Error: {commentsError}</Typography>;
	}

	if (postError) {
		return <Typography color="error">Error: {postError}</Typography>;
	}

	return (
		<Box>
			<Button variant="contained" onClick={() => router.push('/')} sx={{ marginBottom: 3 }}>
				Back to Home
			</Button>
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Post Details
			</Typography>
			{isEditingPost ? (
				<Box>
					<TextField
						label="Title"
						variant="outlined"
						value={postTitle}
						onChange={(e) => setPostTitle(e.target.value)}
						fullWidth
						sx={{ marginBottom: 3 }}
					/>
					<TextField
						label="Content"
						variant="outlined"
						multiline
						rows={4}
						value={postContent}
						onChange={(e) => setPostContent(e.target.value)}
						fullWidth
					/>
					<Button variant="contained" onClick={handlePostUpdate} sx={{ marginTop: 2 }}>
						Save
					</Button>
				</Box>
			) : (
				post && (
					<Box>
						<Typography variant="h5">{post.title}</Typography>
						<Typography variant="body1" sx={{ margin: 2 }}>
							{post.content}
						</Typography>
						<Button variant="contained" onClick={() => setIsEditingPost(true)} sx={{ margin: 1 }}>
							Edit Post
						</Button>
						<Button variant="contained" onClick={handlePostDelete} color="error" sx={{ margin: 1 }}>
							Delete Post
						</Button>
					</Box>
				)
			)}

			<Typography variant="h6" sx={{ marginTop: 3 }}>
				Comments
			</Typography>
			{comments.map((comment) => (
				<Box key={comment.id} sx={{ borderBottom: 1, paddingBottom: 2, marginBottom: 2 }}>
					<Typography variant="body1">{comment.content}</Typography>
				</Box>
			))}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message={snackbarMessage}
			/>
		</Box>
	);
};

export default PostDetails;
