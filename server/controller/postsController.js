import mongoose from "mongoose";
import PostMessage from "../model/postMessage.js";

export const getPosts = async (request, response) => {
    const { page } = request.params

    try {
        const totalPosts = await PostMessage.countDocuments()

        try {            
            const postMessage = await PostMessage.find().skip(page || 0).limit(10)
            response.status(200).json({posts: postMessage, total: totalPosts})
            
        } catch (error) {
            response.status(404).json({message: error.message})
        }
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

export const getPostsBySearch = async (req, res) => {
    try {
        const keyword = new RegExp(req.query.s, 'i')
        const query = { $or: [ { title: keyword } ]}

        const total = await PostMessage.countDocuments( query )
        const posts = await PostMessage.find( query )

        res.status(200).json( { posts, total } )
    } catch (error) {
        res.status(404).json( { message: error.message } )
    }
}

export const createPost = async (request, response) => {
    const post = request.body;
    const newPost = new PostMessage({...post, creator: request.userId, createdAt: new Date().toISOString()})

    try {
        const status = await newPost.save()
        response.status(201).json(status)
    } catch (error) {
        response.status(404).json({message: error.message})
    }
}

export const getPost = async (request, response) => {
    const { id: _id } = request.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(_id)) {
            return response.status(404).send('No post with that id')
        }

        const post = await PostMessage.findById(_id)        
        response.status(201).json(post)
    } catch (error) {        
        response.status(404).json({message: error})
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
        const likers = post.likes
        let likeCount = post.likeCount
        const index = post.likes.findIndex(id => id === String(request.userId))

        console.log(index);
        
        
        if ( index === -1 ) {
            likers.push(request.userId)
            likeCount++ 
        }
        else {
            likers.filter(id => id !== String(request.userId))
            likeCount--
        }       

        const updatedPost = {...post, likes: likers, likeCount}
        const updated = await PostMessage.findByIdAndUpdate(_id, updatedPost, {new: true})   

        if (updated) {
            response.status(201).json(updated)
        }
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}