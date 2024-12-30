import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
import { RootState } from '../store';
import PostItem from './PostItem';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useAppDispatch } from '@/hooks';

const PostList: React.FC = () => {
	const dispatch = useAppDispatch();
	const { posts, loading, error } = useSelector((state: RootState) => state.posts);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	if (loading) {
		return <CircularProgress />;
	}

	if (error) {
		return <Typography color="error">Error: {error}</Typography>;
	}

	return (
		<Box>
			<Typography variant="h4">Posts</Typography>
			{posts.map((post) => (
				<PostItem key={post.id} id={post.id} title={post.title} content={post.content} />
			))}
		</Box>
	);
};

export default PostList;
