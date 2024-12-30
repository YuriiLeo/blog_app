import { Router, Request, Response, NextFunction } from 'express';
import {
	getComment,
	createComment,
	updateComment,
	deleteComment,
	getCommentsByPostId,
} from '../controllers/comment';

const router = Router();

const asyncHandler =
	(fn: (req: Request, res: Response, next: NextFunction) => Promise<Response | void>) =>
	(req: Request, res: Response, next: NextFunction) => {
		fn(req, res, next).catch(next);
	};

router.get('/post/:postId', asyncHandler(getCommentsByPostId));
router.get('/:id', asyncHandler(getComment));
router.post('/', asyncHandler(createComment));
router.put('/:id', asyncHandler(updateComment));
router.delete('/:id', asyncHandler(deleteComment));

export default router;
