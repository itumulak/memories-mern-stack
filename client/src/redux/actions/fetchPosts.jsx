import { fetchPostsApi } from '../../api';
import { logout } from '../slices/authSlice';

export default (builder) => {
    builder
        .addCase(fetchPostsApi.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(fetchPostsApi.fulfilled, (state, action) => {
            const loadedPosts = action.payload;

            return {...state, status: 'succeeded', items: loadedPosts.posts, total: loadedPosts.total, fulfilled: true};
        })
        .addCase(fetchPostsApi.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        });

    return builder
}