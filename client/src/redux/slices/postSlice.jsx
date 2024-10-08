import { createSlice } from "@reduxjs/toolkit";
import { fetchPostApi } from "../../api";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        title: '', 
        tags: [], 
        description: '', 
        author: '', 
        authorId: '',
        image: '', 
        createdAt: '', 
        likeCount: 0
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostApi.fulfilled, (state, action) => {
            const { creator: authorId, title, tags, message: description, name: author, selectedFile: image, createdAt, likeCount } = action.payload

            return {...state, title, tags, description, author, authorId, image, createdAt, likeCount}
        })
    }
})

export default postSlice.reducer