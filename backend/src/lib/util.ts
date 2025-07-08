import jwt from 'jsonwebtoken'
import type { Response } from 'express'
import { Types } from 'mongoose'
import { JWT_SECRET } from './config.ts'

export const generateToken = (userId: Types.ObjectId, res: Response) => {
    const token = jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '7d',
    })

    res.cookie('jwt', token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day in milisecond
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
    })

    return token
}
