import express from 'express';
import { signInUser, signUpUser, validateLogin } from "../controller/authController.js";

const router = express.Router()

router.post('/signin', signInUser)
router.post('/signup', signUpUser)
router.post('/validate', validateLogin)

export default router