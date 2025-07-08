import bcrypt from 'bcryptjs'
import type { Request, RequestHandler, Response } from 'express'
import User from './../models/user.model.ts'
import { generateToken } from '../lib/util.ts'

export const signup = async (req: Request, res: Response) => {
    // ✏️ Take in signup info
    const { username, email, password } = req.body
    // ✏️ Attempt to validate and store signup credentials
    try {
        if (password.length < 8) {
            res.status(400).json({ message: '❌ Password must be at least 8 characters.' }) // ⚠️ Validate password length
            return // 📝 This return is needed to maintain the TS ResponseHandler's return-type contract; Inline 'return' would break the contract
        }

        const user = await User.findOne({ email })

        if (user) {
            res.status(400).json({ message: '❌ Email already exists.' }) // ⚠️ Validate for duplicate Email
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
            generateToken(newUser._id, res)
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
        res.status(500).json({ message: '💢 Something is broken on our end.' })
    }
}

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })

    const isValidPassword = bcrypt.compare(password, user?.password || '')

    if (!user || !isValidPassword) {
        res.status(400).json({ message: '❌ Incorrect username or password.' })
        return
    }
}

export const logout = (req: Request, res: Response) => {
    res.send('logout route')
}
