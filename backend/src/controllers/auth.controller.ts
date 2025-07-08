import bcrypt from 'bcryptjs'
import type { Request, RequestHandler, Response } from 'express'
import User from './../models/user.model.ts'
import { generateTokenAndSetCookie } from '../lib/util.ts'

export const signup = async (req: Request, res: Response) => {
    try {
        // ✏️ Take in signup info and validate
        const { username, email, password } = req.body 
        if (!username || !email || !password) {
            res.status(400).json({ message: '❌ Missing required fields.' })
            return
        }
        if (password.length < 8) {
            res.status(400).json({ message: '❌ Password must be at least 8 characters.' }) 
            return // 📝 This return is needed to maintain the TS ResponseHandler's return-type contract; Inline 'return' would break the contract
        }

        const user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ message: '❌ Email already exists.' })
            return
        }

        // ✏️ Generating a unique salt and hasing out new password
        const salt: string = await bcrypt.genSalt(10)
        const hashedPassword: string = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword, // ✏️ Hashed password is stored
        })

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save() // ✏️ New user is added
            res.status(201).json({
                message: '✔️ New user has been created!',
                username: newUser.username,
                email: newUser.email,
                profilePicture: newUser.profilePicture,
            })
        } else {
            res.status(400).json({ message: '❌ Invalid user data.' })
        }
    } catch (error) {
        console.log('💢 Error within signup controller:', error)
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        // ✏️ Take in login info
        const { username, password } = req.body

        const user = await User.findOne({ username })
        // ✏️ Validate given password against hashed password
        const isValidPassword = bcrypt.compare(password, user?.password || '')

        if (!user || !isValidPassword) {
            res.status(400).json({ message: '❌ Incorrect username or password.' })
            return
        }
        // ✏️ Generate new token and set session cookie
        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            message: '✔️ User sucessfully logged in.',
            username: user.username,
            profilePicture: user.profilePicture,
        })
    } catch (error) {
        console.log('💢 Error within login controller:', error)
        res.status(500).json({ error: '💢 Something is broken on our end.'})
    }
}

export const logout = (req: Request, res: Response) => {
    try {
        // ✏️ Sets JWT age to 0, terminating token
        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: '✔️ Logged out successfully'})
    } catch (error) {
        console.log('💢 Error within logout controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.'})
    }
}
