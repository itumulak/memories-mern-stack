import { createSlice } from "@reduxjs/toolkit";
import fetchPosts from "../actions/fetchPosts";
import createPost from "../actions/createPost";
import updatePost from "../actions/updatePost";
import deletePost from "../actions/deletePost";
import likePost from "../actions/likePost";

const postsSlice = createSlice({
    name: 'posts',
    initialState: {status: 'idle', items: [], error: ''},
    reducers: {},
    extraReducers: (builder) => {
        fetchPosts(builder)
        createPost(builder)
        updatePost(builder)
        deletePost(builder)
        likePost(builder)
    }
})

export default postsSlice.reducer