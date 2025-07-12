import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts'
import type { JwtPayload } from 'jsonwebtoken'
import type { Request, Response, NextFunction } from 'express'

export const protectRoute = async (req: any, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.jwt

        if (!token) {
            res.status(401).json({ message: '❌ Unauthorized.' })
            return
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

        if (!decodedToken) {
            res.status(401).json({ message: '❌ Unauthorized.' })
            return
        }

        const user = await User.findById(decodedToken.userId).select('-password') // ✏️ Selecting user's field besides password.

        if (!user) {
            res.status(404).json({ message: '❌ User not found.' }) // ✏️ Shouldn't happen. But this is here if it does happen.
            return
        }

        req.user = user

        next()
    } catch (error) {
        console.log('💢 Error in protectRoute middleware.')
        res.status(500).json({ message: '💢 Something is broken on our end.' })
    }
}
