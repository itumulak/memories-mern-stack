import { validateLogin } from "../../api"

export default (builder) => {
    builder.addCase(validateLogin.fulfilled, (state, action) => {
        const success = action.payload.success   

        if (success) {
            const { name, id } = action.payload
            return {...state, name, id, isLogin: true }
        }
        else {
            localStorage.removeItem('loginToken')
            localStorage.removeItem('loginName')
            localStorage.removeItem('loginId')

            return {...state, message: action.payload.message, isLogin: false}
        }
    })
}