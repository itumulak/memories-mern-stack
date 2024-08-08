import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/posts'

export const fetchPostsApi = createAsyncThunk('posts/fetch', async () => {
    try {
        const response  = await axios.get(url)
        return [...response.data]
    } catch (error) {
        console.log(error);
    }
})

export const createPostApi = createAsyncThunk('post/add', async (newPost, thunkAPI) => {
    try {        
        const response = await axios.post(url, newPost)
        response.headers.toJSON()

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const updatePostApi = createAsyncThunk('post/update', async (updatedPost) => {
    try {
        const { id } = updatedPost;        
        const response =  await axios.patch(`${url}/${id}`, updatedPost)

        response.headers.toJSON()
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deletePostApi = createAsyncThunk('post/delete', async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${url}/${id}`)
        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const likePostApi = createAsyncThunk('post/like', async (id, thunkAPI) => {
    try {        
        const response = await axios.patch(`${url}/${id}/like`)
        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})
