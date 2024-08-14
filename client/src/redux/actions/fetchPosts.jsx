import { fetchPostsApi } from '../../api';

export default (builder) => {
    builder
        .addCase(fetchPostsApi.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchPostsApi.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const loadedPosts = action.payload;

            state.items = loadedPosts
        })
        .addCase(fetchPostsApi.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        });

    return builder
}