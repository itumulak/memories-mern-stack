import { createUser as createUserApi } from "../../api";

export default (builder) => {    
    builder.addCase(createUserApi.fulfilled, (state, action) => {
        const success = action.payload.success
        
        if (success) {
            const { id, name, token } = action.payload

            localStorage.setItem('loginToken', token) 
            localStorage.setItem('loginName', name)
            localStorage.setItem('loginId', id)

            return {...state, message: '', name, id, token, isLogin: true }
        }
        else {
            return {...state, message: action.payload.message, isLogin: false}
        }
    })
}