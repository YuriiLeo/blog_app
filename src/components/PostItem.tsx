import React, { useState } from 'react';
import Link from 'next/link';
import { deletePost } from '../store/postSlice';
import {
	Box,
	Typography,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Snackbar,
} from '@mui/material';
import { useAppDispatch } from '@/hooks';

interface PostItemProps {
	id: number;
	title: string;
	content: string;
}

const PostItem: React.FC<PostItemProps> = ({ id, title, content }) => {
	const dispatch = useAppDispatch();
	const [openDialog, setOpenDialog] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState('');

	const handleDelete = async () => {
		setOpenDialog(false);
		try {
			await dispatch(deletePost(id));
			setSnackbarMessage('Post deleted successfully');
		} catch (error) {
			setSnackbarMessage('Failed to delete post');
			console.error('Failed to delete post:', error);
		} finally {
			setOpenSnackbar(true);
		}
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<Box sx={{ marginBottom: 2, padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
			<Link href={`/posts/${id}`} passHref>
				<Typography
					variant="h6"
					sx={{ textDecoration: 'none', cursor: 'pointer', color: 'primary.main' }}
				>
					{title}
				</Typography>
			</Link>
			<Typography variant="body1" sx={{ margin: 2 }}>
				{content}
			</Typography>
			<Button variant="contained" color="error" onClick={() => setOpenDialog(true)}>
				Delete
			</Button>
			<Dialog open={openDialog} onClose={handleCloseDialog}>
				<DialogTitle>Confirm Delete</DialogTitle>
				<DialogContent>
					<DialogContentText>Are you sure you want to delete this post?</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseDialog} color="primary">
						Cancel
					</Button>
					<Button onClick={handleDelete} color="error">
						Delete
					</Button>
				</DialogActions>
			</Dialog>
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				message={snackbarMessage}
			/>
		</Box>
	);
};

export default PostItem;
