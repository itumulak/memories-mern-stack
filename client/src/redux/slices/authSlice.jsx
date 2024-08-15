import { createSlice } from "@reduxjs/toolkit";
import signUpUser from '../actions/signUpUser';
import signInUser from '../actions/signInUser';

const initialState =  {
    token: '', 
    message: '', 
    isLogin: false
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        signUpUser(builder)
        signInUser(builder)
    }
})

export default authSlice.reducer