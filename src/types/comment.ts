export interface Comment {
	id: number;
	content: string;
	postId: number;
}

export interface CommentState {
	comments: Comment[];
	loading: boolean;
	error: string | null;
}

export interface AddCommentParams {
	postId: number;
	content: string;
}
