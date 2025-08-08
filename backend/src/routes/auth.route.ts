import express, { json } from 'express'
import { login, logout, signup, updateAvatar, updateUsername, checkAuth  } from '../controllers/auth.controller.ts'
import { protectRoute } from '../middleware/auth.middleware.ts'

const router = express.Router()
router.use(json())

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', logout)

router.put('/update-avatar', protectRoute, updateAvatar)

router.put('/update-username', protectRoute, updateUsername)

router.get('/check', protectRoute, checkAuth)

export default router