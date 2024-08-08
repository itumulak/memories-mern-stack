import express from "express";
import { 
    getPosts as getPostsController, 
    createPost as createPostController, 
    updatePost as updatePostController, 
    deletePost as deletePostController,
    likePost as likePostController
} from "../controller/postsController.js";

const router = express.Router();

router.get('/', getPostsController)
router.post('/', createPostController)
router.patch('/:id', updatePostController)
router.delete('/:id', deletePostController)
router.patch('/:id/like', likePostController)

export default router;