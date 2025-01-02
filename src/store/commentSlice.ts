import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CommentState } from '../types/comment';
import * as commentsAPI from '../api/comments';

const initialState: CommentState = {
	comments: [],
	loading: false,
	error: null,
};

export const fetchCommentsByPostId = createAsyncThunk(
	'comments/fetchCommentsByPostId',
	commentsAPI.fetchCommentsByPostId,
);

export const addComment = createAsyncThunk('comments/addComment', commentsAPI.addComment);

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
				state.error = action.error.message || 'Failed to add comment';
			});
	},
});

export const { clearComments } = commentSlice.actions;
export default commentSlice.reducer;
