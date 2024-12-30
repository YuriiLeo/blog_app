import { Request, Response } from 'express';
import { Post } from '../entity/Post';
import { AppDataSource } from '../data-source';
import { Comment } from '../entity/Comment';

const postRepository = AppDataSource.getRepository(Post);
const commentRepository = AppDataSource.getRepository(Comment);

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
	try {
		const posts = await postRepository.find();
		return res.json(posts);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const getPost = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'ID is required' });
	}
	try {
		const post = await postRepository.findOneBy({ id: parseInt(id) });
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}
		return res.json(post);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const createPost = async (req: Request, res: Response): Promise<Response> => {
	try {
		const post = postRepository.create(req.body);
		const result = await postRepository.save(post);
		return res.status(201).json(result);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const updatePost = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'ID is required' });
	}
	try {
		const post = await postRepository.findOneBy({ id: parseInt(id) });
		if (!post) {
			return res.status(404).json({ message: 'Post not found' });
		}
		postRepository.merge(post, req.body);
		const result = await postRepository.save(post);
		return res.json(result);
	} catch (error) {
		if (error instanceof Error) {
			return res.status(500).json({ message: error.message });
		} else {
			return res.status(500).json({ message: 'An unknown error occurred.' });
		}
	}
};

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
	const { id } = req.params;
	if (!id) {
		return res.status(400).json({ message: 'ID is required' });
	}
	try {
		await commentRepository
			.createQueryBuilder()
			.delete()
			.where('postId = :id', { id: parseInt(id) })
			.execute();
		const result = await postRepository.delete(id);
		if (result.affected === 0) {
			return res.status(404).json({ message: 'Post not found' });
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
