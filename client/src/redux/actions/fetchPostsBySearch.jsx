import { fetchPostsBySearchApi } from "../../api";

export default (builder) => {
    builder
        .addCase(fetchPostsBySearchApi.fulfilled, (state, action) => {
            const {posts, total} = action.payload

            return {...state, status: 'succeeded', items: posts, total, fulfilled: true}
        })
}