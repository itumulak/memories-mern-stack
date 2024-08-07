import { deletePostApi } from "../../api";

export default (builder) => {
    builder
        .addCase(deletePostApi.fulfilled, (state, action) => {
            state.items = state.items.filter(post => post._id !== action.payload._id)
        })
}