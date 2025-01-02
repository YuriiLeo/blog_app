import api from '@/utils/api';
import { Comment, AddCommentParams } from '../types/comment';

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
	const response = await api.get(`/comments/post/${postId}`);
	return response.data;
};

export const addComment = async (params: AddCommentParams): Promise<Comment> => {
	const response = await api.post('/comments', params);
	return response.data;
};
