import express from "express";
import { 
    getPosts as getPostsController, 
    getPostsBySearch as getPostsBySearchController,
    createPost as createPostController, 
    updatePost as updatePostController, 
    deletePost as deletePostController,
    likePost as likePostController
} from "../controller/postsController.js";
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/search', getPostsBySearchController)
router.get('/:page', getPostsController)
router.post('/', authMiddleware, createPostController)
router.patch('/:id', authMiddleware, updatePostController)
router.delete('/:id', authMiddleware, deletePostController)
router.patch('/:id/like', authMiddleware, likePostController)

export default router;