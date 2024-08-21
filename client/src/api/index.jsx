import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH_POSTS = 'posts/fetch'
const FETCH_BY_SEARCH = 'posts/fetchBySearch'
const ADD = 'post/add'
const GET = 'post/get'
const UPDATE = 'post/update'
const DELETE = 'post/delete'
const LIKE = 'post/like'
const CREATE_USER = 'user/create'
const UPDATE_USER = 'user/update'
const SIGNIN_USER = 'user/signin'
const VALIDATE_USER = 'user/validate'
const API = axios.create({baseURL: import.meta.env.VITE_SERVER_URL})

API.interceptors.request.use((request) => {
    const token = localStorage.getItem('loginToken')

    if ( token ) {
        request.headers.Authorization = `Bearer ${token}`
    }

    return request
})

export const fetchPostsApi = createAsyncThunk(FETCH_POSTS, async (page, thunkAPI) => {
    const currentPage = page || 0

    try {
        const response  = await API.get(`/posts/page/${currentPage}`)
        const { posts, total } = response.data

        return {posts, total}
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const fetchPostsBySearchApi = createAsyncThunk(FETCH_BY_SEARCH, async (keyword, thunkAPI) => {
    try {
        const response = await API.get(`/posts/search/?s=${keyword}`)
        const { posts, total } = response.data

        return { posts, total }
    } catch (error) {
        return thunkAPI.rejectWithValue({error})        
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

export const fetchPostApi = createAsyncThunk(GET, async (postId, thunkAPI) => {
    try {
        const response = await API.get(`/posts/${postId}`)
        response.headers.toJSON()

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue({error})
    }
})

export const updatePostApi = createAsyncThunk(UPDATE, async (updatedPost, thunkAPI) => {
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
