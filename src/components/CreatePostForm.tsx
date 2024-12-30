import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createPost } from '../store/postSlice';
import { useAppDispatch } from '@/hooks';

const CreatePostForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			dispatch(createPost({ title, content }));
			setTitle('');
			setContent('');
		} catch (error) {
			console.error('Failed to create post:', error);
		}
	};

	return (
		<Box>
			<Typography variant="h6">Create Post</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
				<TextField
					label="Title"
					variant="outlined"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
				/>
				<TextField
					label="Content"
					variant="outlined"
					multiline
					rows={4}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
				/>
				<Button type="submit" variant="contained" color="primary">
					Create Post
				</Button>
			</Box>
		</Box>
	);
};

export default CreatePostForm;
