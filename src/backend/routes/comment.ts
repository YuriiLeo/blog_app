import { Router } from 'express';
import {
	getComment,
	createComment,
	updateComment,
	deleteComment,
	getCommentsByPostId,
} from '../controllers/comment';
import asyncHandler from '../middleware/asyncHandler';

const router = Router();

router.get('/post/:postId', asyncHandler(getCommentsByPostId));
router.get('/:id', asyncHandler(getComment));
router.post('/', asyncHandler(createComment));
router.put('/:id', asyncHandler(updateComment));
router.delete('/:id', asyncHandler(deleteComment));

export default router;
