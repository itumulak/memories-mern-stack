import { createUser as createUserApi } from "../../api";

export default (builder) => {
    builder.addCase(createUserApi.fulfilled, (state, action) => {
        const { email, firstName, lastName } = action.payload.result
        const token = action.payload.token
        
        state = { email, firstName, lastName, token, isLogin: true }
        localStorage.setItem('loginName', `${firstName} ${lastName}`)
        localStorage.setItem('loginEmail', email)
        localStorage.setItem('loginToken', token)
    })
}