import React from 'react';
import Link from 'next/link';
import { deletePost } from '../store/postSlice';
import { Box, Typography, Button } from '@mui/material';
import { useAppDispatch } from '@/hooks';

interface PostItemProps {
	id: number;
	title: string;
	content: string;
}

const PostItem: React.FC<PostItemProps> = ({ id, title, content }) => {
	const dispatch = useAppDispatch();

	const handleDelete = () => {
		dispatch(deletePost(id));
	};

	return (
		<Box sx={{ marginBottom: 2 }}>
			<Link href={`/posts/${id}`}>{title}</Link>
			<Typography variant="body1" sx={{ margin: 2 }}>
				{content}
			</Typography>
			<Button variant="contained" color="error" onClick={handleDelete}>
				Delete
			</Button>
		</Box>
	);
};

export default PostItem;
