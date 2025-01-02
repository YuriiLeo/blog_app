import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PostState } from '../types/post';
import * as postsAPI from '../api/posts';

const initialState: PostState = {
	posts: [],
	post: null,
	loading: false,
	error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', postsAPI.fetchPosts);

export const createPost = createAsyncThunk('posts/createPost', postsAPI.createPost);

export const fetchPostByPostId = createAsyncThunk(
	'posts/fetchPostByPostId',
	postsAPI.fetchPostByPostId,
);

export const updatePost = createAsyncThunk('posts/updatePost', postsAPI.updatePost);

export const deletePost = createAsyncThunk('posts/deletePost', postsAPI.deletePost);

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = action.payload;
			})
			.addCase(fetchPosts.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch posts';
			})
			.addCase(createPost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				state.loading = false;
				state.posts.push(action.payload);
			})
			.addCase(createPost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create post';
			})
			.addCase(fetchPostByPostId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPostByPostId.fulfilled, (state, action) => {
				state.loading = false;
				state.post = action.payload;
			})
			.addCase(fetchPostByPostId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch post';
			})
			.addCase(updatePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				state.loading = false;
				const index = state.posts.findIndex((post) => post.id === action.payload.id);
				if (index !== -1) {
					state.posts[index] = action.payload;
				}
			})
			.addCase(updatePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to update post';
			})
			.addCase(deletePost.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(deletePost.fulfilled, (state, action) => {
				state.loading = false;
				state.posts = state.posts.filter((post) => post.id !== action.payload);
			})
			.addCase(deletePost.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to delete post';
			});
	},
});

export default postSlice.reducer;
