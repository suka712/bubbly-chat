import express, { json } from 'express'
import { login, logout, signup } from '../controllers/auth.controller.ts'

const router = express.Router()
router.use(json())

router.post('/signup', signup)

router.post('/login', login)

router.get('/logout', logout)

export default router