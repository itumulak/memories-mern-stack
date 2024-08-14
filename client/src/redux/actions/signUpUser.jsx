import { createUser as createUserApi } from "../../api";

export default (builder) => {    
    builder.addCase(createUserApi.fulfilled, (state, action) => {
        const success = action.payload.success
        
        if (success) {
            const { email, firstName, lastName } = action.payload.data
            const token = action.payload.token
            localStorage.setItem('loginName', `${firstName} ${lastName}`)
            localStorage.setItem('loginEmail', email)
            localStorage.setItem('loginToken', token)         
            return {...state, email, firstName, lastName, token, isLogin: true }
        }
        else {
            return {...state, message: action.payload.message, isLogin: false}
        }
    })
}