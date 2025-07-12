import express, { json } from 'express'
import { login, logout, signup, updateProfile, checkAuth } from '../controllers/auth.controller.ts'
import { protectRoute } from '../middleware/auth.middleware.ts'

const router = express.Router()
router.use(json())

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', logout)

router.put('/update-profile', protectRoute, updateProfile)

router.get('/check', protectRoute, checkAuth)

export default router