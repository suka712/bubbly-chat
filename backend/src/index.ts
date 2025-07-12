import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.ts'
import messageRouter from './routes/message.route.ts'
import { connectDB } from './lib/db.ts'
import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config()

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
        origin: 'http://localhost:5173',
        credentials: true,
    })
)

const PORT = process.env.PORT

app.use('/api/auth', authRouter)
app.use('/api/message', messageRouter)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}!`)
    connectDB()
})
