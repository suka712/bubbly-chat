import type { Request, Response } from 'express'
import User from '../models/user.model.ts'

export const getUsersForSideBar = async (req: any, res: Response) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password')

        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log('💢 Error on getUsersForSideBar controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}
