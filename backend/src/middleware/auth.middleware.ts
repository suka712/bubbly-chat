import * as jwt from 'jsonwebtoken'
import User from '../models/user.model'
import type { Request, Response, NextFunction } from 'express'

export const protectRoute = async (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!)
    if (!decodedToken) {
      return res.status(401).json({ message: 'Unauthorized.' })
    }

    if (typeof decodedToken !== 'object' || !decodedToken?.userId) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token payload' })
    }

    const user = await User.findById(decodedToken.userId).select('-password')
    req.user = user
    next()
  } catch (error) {
    console.log('Error in protectRoute middleware:', error)
    res.status(500).json({ message: 'Something is broken on our end.' })
  }
}
