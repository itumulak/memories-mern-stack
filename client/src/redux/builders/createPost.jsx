import { createPost } from '../../api';

export default (builder) => {
    builder
        .addCase(createPost.fulfilled, (state, action) => {
            state.items.push(action.payload)
        })

    return builder
}