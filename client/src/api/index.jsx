import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/posts'

export const fetchPosts = createAsyncThunk('posts/fetch', async () => {
    try {
        const response  = await axios.get(url)
        return [...response.data]
    } catch (error) {
        console.log(error);
    }
})

export const createPost = createAsyncThunk('post/add', async (newPost, thunkAPI) => {
    try {        
        const response = await axios.post(url, newPost)
        response.headers.toJSON()

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const updatePost = createAsyncThunk('post/update', async (updatedPost) => {
    try {
        const { id } = updatedPost;        
        const response =  await axios.patch(`${url}/${id}`, updatedPost)

        response.headers.toJSON()
        return response.data
    } catch (error) {
        console.log(error)
    }
})