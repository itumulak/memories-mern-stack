import { likePostApi } from "../../api";

export default ((builder) => {
    builder
        .addCase(likePostApi.fulfilled, (state, action) => {
            state.items = state.items.map(post => post._id === action.payload._id ? action.payload : post)
        })
})