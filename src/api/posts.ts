import api from '@/utils/api';
import { CreatePostParams, UpdatePostParams, Post } from '../types/post';

export const fetchPosts = async (): Promise<Post[]> => {
	const response = await api.get('/posts');
	return response.data;
};

export const createPost = async (params: CreatePostParams): Promise<Post> => {
	const response = await api.post('/posts', params);
	return response.data;
};

export const fetchPostByPostId = async (id: number): Promise<Post> => {
	const response = await api.get(`/posts/${id}`);
	return response.data;
};

export const updatePost = async (params: UpdatePostParams): Promise<Post> => {
	const response = await api.put(`/posts/${params.postId}`, params);
	return response.data;
};

export const deletePost = async (postId: number): Promise<number> => {
	await api.delete(`/posts/${postId}`);
	return postId;
};
