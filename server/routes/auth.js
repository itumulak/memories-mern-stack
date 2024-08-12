import express from 'express';
import { signInUser, signUpUser } from "../controller/authController";

const router = express.Router()

router.post('/signin', signInUser)
router.post('/signup', signUpUser)

export default router