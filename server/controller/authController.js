import moongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import Users from '../model/auth.js';

export const signInUser = async (request, response) => {
    try {
        const { email , password } = request.body
        const existingUser = await Users.findOne({email})
    
        if ( ! existingUser ) {
            return response.status(404).json({success: false, message: `User doesn't exist.`})
        }
         
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    
        if ( ! isPasswordCorrect ) {
            return response.status(400).json({success: false, message: `Email/Password is incorrect.`})
        }
        
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, process.env.JWT_SECRET, { expiresIn: '1h'})
     
        response.status(201).json({token, name: `${existingUser.firstName} ${existingUser.lastName}`, success: true})
    } catch (error) {
        response.status(404).json({success: false, message: error.message})
    }
}

export const signUpUser = async (request, response) => {
    try {
        const { email, password, confirmPassword, firstName, lastName } = request.body
        const existingUser = await Users.findOne({email})

        if ( existingUser ) {
            return response.status(400).json({success: false, message: `Email alrady in use.`})
        }

        if ( password === confirmPassword ) {
            bcrypt.hash(password, 10, async (error, hash) => {
                if (error) {
                    return response.status(404).json({success: false, message: 'An internal error occured', error})
                }
    
                const newUser = new Users({email, password: hash, firstName, lastName})
    
                try {
                    const result = await newUser.save()
                    const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
                    
                    response.status(201).json({token, name: `${result.firstName} ${result.lastName}`, success: true})
                } catch (error) {
                    response.status(404).json({success: false, message: 'An internal error occured', error})
                }
            })
        }
        else {
            return response.status(400).json({message: 'Password and confirm password did not match.'})
        }
        
    } catch (error) {
        response.status(404).json(error)
    }
}

export const validateLogin = async (request, response) => {
    const {token} = request.body
    
    jwt.verify(token, process.env.JWT_SECRET, async (error, decoded) => {       
        if (error) {
            response.json({success: false, name: error.name, message: error.message})
        }
        else {
            const userId = decoded?.id
            const user = await Users.findById(userId)
            response.json({success: true, name: `${user.firstName} ${user.lastName}`})
        }
    })
}