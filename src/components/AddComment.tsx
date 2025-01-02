'use client';

import React, { useState } from 'react';
import { addComment } from '../store/commentSlice';
import { Button, Box, TextField, Typography, Snackbar } from '@mui/material';
import { useAppDispatch } from '@/hooks';

interface AddCommentProps {
	postId: number;
}

const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
	const [content, setContent] = useState('');
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			dispatch(addComment({ postId, content }));
			setContent('');
			setSnackbarMessage('Comment added successfully');
		} catch (error) {
			setSnackbarMessage('Failed to create comment');
			console.error('Failed to create comment:', error);
		} finally {
			setOpenSnackbar(true);
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Box>
			<Typography variant="h6">Add Comment</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
			>
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
					Create Comment
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

export default AddComment;
