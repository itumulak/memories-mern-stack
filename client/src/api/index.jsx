import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = 'http://localhost:5000/posts'
const FETCH = 'posts/fetch'
const ADD = 'post/add'
const UPDATE = 'post/update'
const DELETE = 'post/delete'
const LIKE = 'post/like'
const CREATE_USER = 'user/create'
const UPDATE_USER = 'user/update'
const FETCH_USER = 'user/fetch'

export const fetchPostsApi = createAsyncThunk(FETCH, async () => {
    try {
        const response  = await axios.get(url)
        return [...response.data]
    } catch (error) {
        console.log(error);
    }
})

export const createPostApi = createAsyncThunk(ADD, async (newPost, thunkAPI) => {
    try {        
        const response = await axios.post(url, newPost)
        response.headers.toJSON()

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const updatePostApi = createAsyncThunk(UPDATE, async (updatedPost) => {
    try {
        const { id } = updatedPost;        
        const response =  await axios.patch(`${url}/${id}`, updatedPost)

        response.headers.toJSON()
        return response.data
    } catch (error) {
        console.log(error)
    }
})

export const deletePostApi = createAsyncThunk(DELETE, async (id, thunkAPI) => {
    try {
        const response = await axios.delete(`${url}/${id}`)
        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const likePostApi = createAsyncThunk(LIKE, async (id, thunkAPI) => {
    try {        
        const response = await axios.patch(`${url}/${id}/like`)
        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const createUser = createAsyncThunk(CREATE_USER, async (data, thunkAPI) => {
    try {
        
    } catch (error) {
        
    }
})

export const updateUser = createAsyncThunk(UPDATE_USER, async (data, thunkAPI) => {
    try {
        
    } catch (error) {
        
    }
})

export const fetchUser = createAsyncThunk(FETCH_USER, async (data, thunkAPI) => {
    try {
        
    } catch (error) {
        
    }
})
