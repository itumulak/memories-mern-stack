import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "./slices/postsSlice"; 
import authReducer from './slices/authSlice';
import postReducer from './slices/postSlice'

export default configureStore({
    reducer: {
        posts: postsReducer,
        post: postReducer,
        auth: authReducer
    }
})