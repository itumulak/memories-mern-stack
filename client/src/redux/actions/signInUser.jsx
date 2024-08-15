import { signIn } from "../../api";

export default (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
        const success = action.payload.success

        if (success) {
            const token = action.payload.token

            localStorage.setItem('loginToken', token)         
            return {...state, message: '', token, isLogin: true }
        }
        else {
            return {...state, message: action.payload.message, isLogin: false}
        }
    })
}