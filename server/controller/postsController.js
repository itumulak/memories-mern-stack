import mongoose from "mongoose";
import PostMessage from "../model/postMessage.js";

export const getPosts = async (request, response) => {
    try {
        const postMessage = await PostMessage.find()
        response.status(200).json(postMessage)
        
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

export const createPost = async (request, response) => {
    const post = request.body;
    const newPost = new PostMessage(post)

    try {
        const status = await newPost.save()
        response.status(201).json(status)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

export const updatePost = async (request, response) => {
    const { id: _id } = request.params;
    const post = request.body;    

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return response.status(404).send('No post with that id')
        }
    
        const status = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true})
        response.status(201).json(status)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

export const deletePost = async (request, response) => {
    const { id: _id } = request.params

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return response.status(404).send('No post with that id')
        }

        const status = await PostMessage.findByIdAndDelete(_id)
        response.status(200).json(status)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

export const likePost = async (request, response) => {
    const { id: _id } = request.params

    try {
        if ( ! request.userId ) {
            return request.status(401).json({message: 'Unauthorized.'})
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return response.status(404).send('No post with that id')
        }

        const post = await PostMessage.findById(_id)
        const index = post.likes.findById(id => id === String(request.userId))

        if ( index === -1 ) {
            post.likes.push(request.userId)
            post.likeCount++
        }
        else {
            post.likes.filter(id => id !== String(request.userId))
            post.likeCount--
        }      

        const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post}, {new: true})        
        response.status(201).json(updatePost)
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}