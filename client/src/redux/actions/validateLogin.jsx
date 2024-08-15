import { validateLogin } from "../../api"

export default (builder) => {
    builder.addCase(validateLogin.fulfilled, (state, action) => {
        const success = action.payload.success   

        if (success) {
            return {...state, isLogin: true }
        }
        else {
            localStorage.removeItem('loginToken')
            localStorage.removeItem('loginName')
            return {...state, message: action.payload.message, isLogin: false}
        }
    })
}