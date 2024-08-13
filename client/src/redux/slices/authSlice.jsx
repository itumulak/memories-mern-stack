import { createSlice } from "@reduxjs/toolkit";
import signUpUser from '../builders/signUpUser';

const initialState =  {firstName: '', lastName: '', email: '', token: '', isLogin: false}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        signUpUser(builder)
    }
})

export default authSlice.reducer