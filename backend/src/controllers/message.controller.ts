import type { Request, Response } from 'express'
import User from '../models/user.model.ts'
import Message from '../models/message.model.ts'

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

export const getMessages = async (req: any, res: Response) => {
    try {
        const { id: chatWithId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: chatWithId },
                { senderId: chatWithId, receiverId: myId },
            ],
        })

        res.status(200).json(messages)
    } catch (error) {
        console.log('💢 Error on getMessages controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}

export const sendMessage = async (req: any, res: Response) => {
    try {
        const {text, image} = req.body
        const { id: receiverId } = req.body
    } catch (error) {
        
    }
}
