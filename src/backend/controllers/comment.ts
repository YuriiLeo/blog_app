import { Request, Response } from 'express';
import { Comment } from '../entity/Comment';
import { Post } from '../entity/Post';
import { AppDataSource } from '../data-source';

const commentRepository = AppDataSource.getRepository(Comment);
const postRepository = AppDataSource.getRepository(Post);

export const getCommentsByPostId = async (req: Request, res: Response) => {
	const { postId } = req.params;
	if (!postId) {
		return res.status(400).json({ message: 'PostId is required' });
	}
	try {
		const comments = await commentRepository.find({
			where: { post: { id: parseInt(postId) } },
			relations: ['post'],
		});

		if (!comments.length) {
			return res.status(404).json({ message: 'Comments not found' });
		}

		return res.status(200).json(comments);
	} catch (error) {
		return res.status(500).json({ message: 'Server error', error });
	}
};

export const getComment = async (req: Request, res: Response): Promise<Response | void> => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'ID is required' });
	}
	try {
		const comment = await commentRepository.findOneBy({ id: parseInt(id) });
		if (!comment) {
			return res.status(404).json({ message: 'Comment not found' });
		}
		return res.json(comment);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const createComment = async (req: Request, res: Response): Promise<Response | void> => {
	const { postId, content } = req.body;
	try {
		const post = await postRepository.findOneBy({ id: parseInt(postId) });
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}
		const comment = commentRepository.create({ content, post });
		const result = await commentRepository.save(comment);
		return res.status(201).json(result);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const updateComment = async (req: Request, res: Response): Promise<Response | void> => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'ID is required' });
	}
	try {
		const comment = await commentRepository.findOneBy({ id: parseInt(id) });
		if (!comment) {
			return res.status(404).json({ message: 'Comment not found' });
		}
		commentRepository.merge(comment, req.body);
		const result = await commentRepository.save(comment);
		return res.json(result);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const deleteComment = async (req: Request, res: Response): Promise<Response | void> => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'ID is required' });
	}
	try {
		const result = await commentRepository.delete(id);
		if (result.affected === 0) {
			return res.status(404).json({ message: 'Comment not found' });
		}
		return res.status(204).send();
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};
