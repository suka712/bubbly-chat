import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import User from './../models/user.model.ts'
import { generateTokenAndSetCookie } from '../lib/util.ts'
import cloudinary from '../lib/cloudinary.ts'

export const signup = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            res.status(400).json({ message: '❌ Missing required fields.' })
            return
        }
        if (password.length < 8) {
            res.status(400).json({ message: '❌ Password must be at least 8 characters.' })
            return // 📝 This 'return' is needed to maintain the TS ResponseHandler's return-type contract; Inline 'return' would break the contract
        }

        const user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ message: '❌ Email already exists.' })
            return
        }

        const salt: string = await bcrypt.genSalt(10)
        const hashedPassword: string = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword, 
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()
            res.status(201).json({
                message: 'Account created successfully!',
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })
        } else {
            res.status(400).json({ message: 'Invalid user data.' })
        }
    } catch (error) {
        console.log('💢 Error in Signup controller:', error)
        res.status(500).json({ error: 'Something is broken on our end.' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        const isValidPassword = await bcrypt.compare(password, user?.password || '')

        if (!user || !isValidPassword) {
            res.status(400).json({ message: 'Incorrect username or password.' })
            return
        }
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            message: 'Logged in successfully.',
            username: user.username,
            email: user.email,
            profilePicture: user.profilePicture,
        })
    } catch (error) {
        console.log('💢 Error in Login controller:', error)
        res.status(500).json({ error: 'Something is broken on our end.' })
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        res.cookie('jwt', '', { 
            maxAge: 0,
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV !== 'development', 
        })
        res.status(200).json({ message: '✔️ Logged out successfully' })
    } catch (error) {
        console.log('💢 Error in Logout controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}

export const updateProfile = async (req: any, res: Response) => {
    try {
        const { profilePicture } = req.body
        const userId = req.user._id

        if (!profilePicture) {
            res.status(400).json({ message: '❌ Profile picture is required' })
            return
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePicture) 

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePicture: uploadResponse.secure_url }, { new: true }) 

        res.status(200).json({ message: '✔️ Successfully updated user.', updatedUser })
    } catch (error) {
        console.log('💢 Error in updateProfile controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}

export const checkAuth = async (req: any, res: Response) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        console.log('💢 Error in checkAuth controller.')
        res.status(500).json({ message: '💢 Something is broken on our end.' })
    }
}
