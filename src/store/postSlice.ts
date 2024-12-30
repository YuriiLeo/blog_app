import api from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Post {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

interface PostState {
	posts: Post[];
	post: Post | null;
	loading: boolean;
	error: string | null;
}

const initialState: PostState = {
	posts: [],
	post: null,
	loading: false,
	error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await api.get('/posts');
	return response.data;
});

export const createPost = createAsyncThunk(
	'posts/createPost',
	async ({ title, content }: { title: string; content: string }) => {
		const response = await api.post('/posts', { title, content });
		return response.data;
	},
);

export const fetchPostByPostId = createAsyncThunk(
	'posts/fetchCommentsByPostId',
	async (id: number) => {
		const response = await api.get(`/posts/${id}`);
		return response.data;
	},
);

export const updatePost = createAsyncThunk(
	'posts/updatePost',
	async ({ postId, title, content }: { postId: number; title: string; content: string }) => {
		const response = await api.put(`/posts/${postId}`, { title, content });
		return response.data;
	},
);

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: number) => {
	await api.delete(`/posts/${postId}`);
	return postId;
});

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
				state.error = action.error.message || 'Failed to fetch comments';
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
				state.error = action.error.message || 'Failed to fetch comments';
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
				state.error = action.error.message || 'Failed to fetch comments';
			});
	},
});

export default postSlice.reducer;
