import { fetchPosts } from '../../api';

export default (builder) => {
    builder
        .addCase(fetchPosts.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded'
            const loadedPosts = action.payload;

            state.items = loadedPosts
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        });

    return builder
}