import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH = 'posts/fetch'
const ADD = 'post/add'
const UPDATE = 'post/update'
const DELETE = 'post/delete'
const LIKE = 'post/like'
const CREATE_USER = 'user/create'
const UPDATE_USER = 'user/update'
const SIGNIN_USER = 'user/signin'
const VALIDATE_USER = 'user/validate'
const API = axios.create({baseURL: 'http://localhost:5000'})

API.interceptors.request.use((request) => {
    const token = localStorage.getItem('loginToken')

    if ( token ) {
        request.headers.Authorization = `Bearer ${token}`
    }

    return request
})

export const fetchPostsApi = createAsyncThunk(FETCH, async () => {
    try {
        const response  = await API.get('/posts')
        return [...response.data]
    } catch (error) {
        console.log(error);
    }
})

export const createPostApi = createAsyncThunk(ADD, async (newPost, thunkAPI) => {
    try {        
        const response = await API.post('/posts', newPost)
        response.headers.toJSON()

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const updatePostApi = createAsyncThunk(UPDATE, async (updatedPost) => {
    try {
        const { id } = updatedPost;        
        const response =  await API.patch(`/posts/${id}`, updatedPost)

        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const deletePostApi = createAsyncThunk(DELETE, async (id, thunkAPI) => {
    try {
        const response = await API.delete(`posts/${id}`)
        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const likePostApi = createAsyncThunk(LIKE, async (id, thunkAPI) => {
    try {        
        const response = await API.patch(`/posts/${id}/like`, id)
        response.headers.toJSON()
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const signIn = createAsyncThunk(SIGNIN_USER, async (data, thunkAPI) => {
    try {
        const response = await API.post('/user/signin', data)
        response.headers.toJSON()

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const createUser = createAsyncThunk(CREATE_USER, async (data, thunkAPI) => {
    try {
        const response = await API.post('/user/signup', data)
        response.headers.toJSON()

        return response.data
    } catch (error) {        
        return thunkAPI.rejectWithValue({error})
    }
})

export const updateUser = createAsyncThunk(UPDATE_USER, async (data, thunkAPI) => {
    try {
        
    } catch (error) {
        
    }
})

export const validateLogin = createAsyncThunk(VALIDATE_USER, async (token, thunkAPI) => {
    try {
        const response = await API.post('/user/validate', token)
        response.headers.toJSON()
        
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})
