import moongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import AuthUser from '../model/auth';

export const signInUser = async (request, response) => {
    try {
        const { email , password } = request.border
        const existingUser = await AuthUser.findOne({email})
    
        if ( ! existingUser ) {
            return response.status(404).json({message: `User doesn't exist.`})
        }
         
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)
    
        if ( ! isPasswordCorrect ) {
            return response.status(400).json({message: `Email/Password is incorrect.`})
        }
        
        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: '1h'})
    
        response.status(200).json({result: existingUser, token})
    } catch (error) {
        response.status(404).json({error})
    }
}

export const signUpUser = async (request, response) => {
    try {
        const { email, password, confirmPassword, firstName, lastName } = request.body
        const existingUser = await AuthUser.findOne({email})

        if ( existingUser ) {
            return response.status(400).json({message: `Email alrady in use.`})
        }

        if ( password === confirmPassword ) {
            bcrypt.hash(password, 10, async (error, hash) => {
                if (error) {
                    return response.status(404).json(error)
                }
    
                const newUser = new AuthUser({email, password: hash, firstName, lastName})
    
                try {
                    const result = await newUser.save()
                    const token = jwt.sign({email: result.email, id: result._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
                    
                    response.status(200).json({result, token})
                } catch (error) {
                    response.status(404).json(error)
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