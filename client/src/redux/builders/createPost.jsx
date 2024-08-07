import { createPostApi } from '../../api';

export default (builder) => {
    builder
        .addCase(createPostApi.fulfilled, (state, action) => {
            state.items.push(action.payload)
        })

    return builder
}