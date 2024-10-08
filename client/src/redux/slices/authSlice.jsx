import { createSlice } from "@reduxjs/toolkit";
import signUpUser from '../actions/signUpUser';
import signInUser from '../actions/signInUser';
import validateLogin from '../actions/validateLogin';

const initialState =  {
    token: '', 
    message: '', 
    id: '',
    name: '',
    isLogin: false
}

const authSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem('loginToken')
            localStorage.removeItem('loginName')
            localStorage.removeItem('loginId')
            return {...initialState}
        }
    },
    extraReducers: (builder) => {
        signUpUser(builder)
        signInUser(builder)
        validateLogin(builder)
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer