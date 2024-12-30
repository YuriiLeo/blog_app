'use client';

import React, { useState } from 'react';
import { addComment } from '../store/commentSlice';
import { Button, Box, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@/hooks';

interface AddCommentProps {
	postId: number;
}

const AddComment: React.FC<AddCommentProps> = ({ postId }) => {
	const [content, setContent] = useState('');
	const dispatch = useAppDispatch();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		try {
			dispatch(addComment({ postId, content }));
			setContent('');
		} catch (error) {
			console.error('Failed to create comment:', error);
		}
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
		</Box>
	);
};

export default AddComment;
