import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
import { RootState } from '../store';
import PostItem from './PostItem';
import { Box, Typography, Button, Skeleton } from '@mui/material';
import { useAppDispatch } from '@/hooks';

const PostList: React.FC = () => {
	const dispatch = useAppDispatch();
	const { posts, loading, error } = useSelector((state: RootState) => state.posts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	const handleRetry = () => {
		dispatch(fetchPosts());
	};

	if (loading) {
		return (
			<Box>
				<Typography variant="h4">Posts</Typography>
				{[1, 2, 3].map((item) => (
					<Skeleton key={item} variant="rectangular" height={118} sx={{ marginBottom: 2 }} />
				))}
			</Box>
		);
	}

	if (error) {
		return (
			<Box>
				<Typography color="error">Error: {error}</Typography>
				<Button variant="contained" onClick={handleRetry}>
					Retry
				</Button>
			</Box>
		);
	}

	return (
		<Box>
			<Typography variant="h4" sx={{ marginBottom: 3 }}>
				Posts
			</Typography>
			{posts.map((post) => (
				<PostItem key={post.id} id={post.id} title={post.title} content={post.content} />
			))}
		</Box>
	);
};

export default PostList;
