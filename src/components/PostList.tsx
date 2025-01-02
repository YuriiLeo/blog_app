import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchPosts } from '../store/postSlice';
import { RootState } from '../store';
import PostItem from './PostItem';
import { Box, Typography, CircularProgress, Button, TextField, Pagination } from '@mui/material';
import { useAppDispatch } from '@/hooks';

const POSTS_PER_PAGE = 5;

const PostList: React.FC = () => {
	const dispatch = useAppDispatch();
	const { posts, loading, error } = useSelector((state: RootState) => state.posts);

	const [searchPosts, setSearchPosts] = useState('');
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(fetchPosts());
	}, [dispatch]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchPosts(event.target.value);
		setCurrentPage(1);
	};

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	const handleRetry = () => {
		dispatch(fetchPosts());
	};

	const filteredPosts = posts.filter((post) => {
		const matchesSearch =
			post.title.toLowerCase().includes(searchPosts.toLowerCase()) ||
			post.content.toLowerCase().includes(searchPosts.toLowerCase());
		return matchesSearch;
	});

	const paginatedPosts = filteredPosts.slice(
		(currentPage - 1) * POSTS_PER_PAGE,
		currentPage * POSTS_PER_PAGE,
	);
	const pageCount = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);

	if (loading) {
		return <CircularProgress />;
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
			<Box sx={{ display: 'flex', gap: 2, marginBottom: 3 }}>
				<TextField
					label="Search"
					variant="outlined"
					value={searchPosts}
					onChange={handleSearchChange}
					fullWidth
				/>
			</Box>
			{paginatedPosts.map((post) => (
				<PostItem key={post.id} id={post.id} title={post.title} content={post.content} />
			))}
			<Pagination
				count={pageCount}
				page={currentPage}
				onChange={handlePageChange}
				sx={{ marginTop: 3 }}
			/>
		</Box>
	);
};

export default PostList;
