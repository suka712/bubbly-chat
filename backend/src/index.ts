import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.route.ts'
import { connectDB } from './lib/db.ts'

dotenv.config()

const app = express()
app.use(express.json())
const PORT = process.env.PORT

app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}!`)
    connectDB()
})
