import { Router, Request, Response, NextFunction } from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post';

const router = Router();

const asyncHandler =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<Response>) =>
	(req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};

router.get('/', asyncHandler(getPosts));
router.get('/:id', asyncHandler(getPost));
router.post('/', asyncHandler(createPost));
router.put('/:id', asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

export default router;
