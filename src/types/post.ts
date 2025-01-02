export interface Post {
	id: number;
	title: string;
	content: string;
	createdAt: string;
	updatedAt: string;
}

export interface PostState {
	posts: Post[];
	post: Post | null;
	loading: boolean;
	error: string | null;
}

export interface CreatePostParams {
	title: string;
	content: string;
}

export interface UpdatePostParams {
	postId: number;
	title: string;
	content: string;
}
