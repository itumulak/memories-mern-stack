import { createSlice } from "@reduxjs/toolkit";
import fetchPosts from "../builders/fetchPosts";
import createPost from "../builders/createPost";
import updatePost from "../builders/updatePost";
import deletePost from "../builders/deletePost";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {status: 'idle', items: [], error: ''},
    reducers: {},
    extraReducers: (builder) => {
        fetchPosts(builder)
        createPost(builder)
        updatePost(builder)
        deletePost(builder)
    }
})

export const {add} = postsSlice.actions
export default postsSlice.reducer