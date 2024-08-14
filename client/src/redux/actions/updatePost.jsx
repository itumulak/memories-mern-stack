import { updatePostApi } from "../../api";

export default (builder) => {
    builder
        .addCase(updatePostApi.fulfilled, (state, action) => {
            state.items = state.items.map(post => post._id === action.payload._id ? action.payload : post)
        })
    
    return builder
}