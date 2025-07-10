import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.ts'
import { getUsersForSideBar, getMessages, sendMessage } from '../controllers/message.controller.ts'

const router = express.Router()

router.get('/users', protectRoute, getUsersForSideBar)
router.get('/:id', protectRoute, getMessages)

router.post('/send/:id', sendMessage)

export default router