import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Snackbar } from '@mui/material';
import { createPost } from '../store/postSlice';
import { useAppDispatch } from '@/hooks';

const CreatePostForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!title || !content) {
			setSnackbarMessage('Title and content are required');
			setOpenSnackbar(true);
			return;
		}

		try {
			dispatch(createPost({ title, content }));
			setTitle('');
			setContent('');
			setSnackbarMessage('Post created successfully');
		} catch (error) {
			setSnackbarMessage('Failed to create post');
			console.error('Failed to create post:', error);
		} finally {
			setOpenSnackbar(true);
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
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
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message={snackbarMessage}
			/>
		</Box>
	);
};

export default CreatePostForm;
