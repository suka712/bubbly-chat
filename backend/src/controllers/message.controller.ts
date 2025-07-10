import type { Request, Response } from 'express'
import User from '../models/user.model.ts'
import Message from '../models/message.model.ts'
import cloudinary from '../lib/cloudinary.ts'

export const getUsersForSideBar = async (req: any, res: Response) => {
    try {
        const loggedInUserId = req.user._id

        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select('-password') // ✏️ Find users with ID not equal to that one logged in. And excludes passwords as well.

        res.status(200).json(filteredUsers) // ✏️ Respond with the list of users
    } catch (error) {
        console.log('💢 Error on getUsersForSideBar controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}

export const getMessages = async (req: any, res: Response) => {
    try {
        const { id: chatWithId } = req.params // ✏️ Get the ID of the person we are chatting with from the parameter. (PASSED IN THROUGH PARAMS)
        const myId = req.user._id // ✏️ Get the ID of OURSELVES (PASSED IN THROUGH MIDDLEWARE)

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: chatWithId }, // ✏️ Get messages of EITHER the PERSON WE ARE CHATTING WITH or OURSELVES
                { senderId: chatWithId, receiverId: myId },
            ],
        })

        res.status(200).json(messages) // ✏️ Responds with the messages.
    } catch (error) {
        console.log('💢 Error on getMessages controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })
    }
}

export const sendMessage = async (req: any, res: Response) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.body
        const senderId = req.user._id
        
        let imageUrl: string | undefined
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId: senderId,
            receiverId: receiverId,
            text: text, 
            image: imageUrl
        })

        await newMessage.save()

        // TODO: realtime functionalities with SocketIO
    } catch (error) {
        console.log('💢 Error on sendMessage controller.')
        res.status(500).json({ error: '💢 Something is broken on our end.' })        
    }
}
