import express from 'express'
import type { Request, Response } from 'express'
import User from '../models/user.model'

export const getUsersForSideBar = async (req: any, res: Response) => {
    try {
        const loggedInUserId = req.user._id

        const users = await User.find({ _id: { $ne: loggedInUserId } }).select('username profilePicture _id')
    } catch (error) {}
}
