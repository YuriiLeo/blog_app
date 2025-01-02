import { Router } from 'express';
import { getPosts, getPost, createPost, updatePost, deletePost } from '../controllers/post';

import asyncHandler from '../middleware/asyncHandler';

const router = Router();

router.get('/', asyncHandler(getPosts));
router.get('/:id', asyncHandler(getPost));
router.post('/', asyncHandler(createPost));
router.put('/:id', asyncHandler(updatePost));
router.delete('/:id', asyncHandler(deletePost));

export default router;
