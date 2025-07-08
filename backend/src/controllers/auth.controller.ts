import express from 'express'
import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'
import User from './../models/user.model.ts'
import { generateToken } from '../lib/util.ts'

export const signup = async (req: Request, res: Response) => {
    const { username, email, password } = req.body as {
        username: string
        email: string
        password: string
    }
    try {
        if (password.length < 8) {
            return res
                .status(400)
                .json({ message: '❌ Password must be at least 8 character.' })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: '❌ Email already exists.' })
        }

        const salt: string = await bcrypt.genSalt(10)
        const hashedPassword: string = await bcrypt.hash(password, salt)

        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        })

        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()
        } else {
            return res.status(400).json({
                message: '❌ Invalid user data.'
            })
        }
    } catch (error) {}
}

export const login = (req: Request, res: Response) => {
    res.send('login route')
}

export const logout = (req: Request, res: Response) => {
    res.send('logout route')
}
