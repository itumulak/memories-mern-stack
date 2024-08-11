import { createSlice } from "@reduxjs/toolkit";

const initialState =  {firstName: '', lastName: '', email: '', token: ''}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            const token = dummyToken()
            console.log('auth slice');
            
            localStorage.setItem('name', `${action.payload.firstName} ${action.payload.lastName}`)
            localStorage.setItem('email', action.payload.email)
            localStorage.setItem('token', token)
            state = {firstName: action.payload.firstName, lastName: action.payload.lastName, email: action.payload.email, token: token}
        },
        logout: (state, action) => {
            state = initialState
            localStorage.removeItem('name')
            localStorage.removeItem('email')
            localStorage.removeItem('token')
        }
    }
})

export const {login, logout} = authSlice.actions
export default authSlice.reducer

const dummyToken = () => {
    return Math.floor(1000000000000000 + Math.random() * 9000000000000000)
          .toString(36).substring(0, 10)
}