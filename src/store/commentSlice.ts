import api from '@/utils/api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Comment {
	id: number;
	content: string;
	postId: number;
}

interface CommentState {
	comments: Comment[];
	loading: boolean;
	error: string | null;
}

const initialState: CommentState = {
	comments: [],
	loading: false,
	error: null,
};

export const fetchCommentsByPostId = createAsyncThunk(
	'comments/fetchCommentsByPostId',
	async (postId: number) => {
		const response = await api.get(`/comments/post/${postId}`);
		return response.data;
	},
);

export const addComment = createAsyncThunk(
	'comments/addComment',
	async ({ postId, content }: { postId: number; content: string }) => {
		const response = await api.post('/comments', { postId, content });
		return response.data;
	},
);

const commentSlice = createSlice({
	name: 'comments',
	initialState,
	reducers: {
		clearComments: (state) => {
			state.comments = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsByPostId.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
				state.loading = false;
				state.comments = action.payload;
			})
			.addCase(fetchCommentsByPostId.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to fetch comments';
			})
			.addCase(addComment.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(addComment.fulfilled, (state, action) => {
				state.loading = false;
				state.comments.push(action.payload);
			})
			.addCase(addComment.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message || 'Failed to create post';
			});
	},
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
