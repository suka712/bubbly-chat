import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('❌ MONGO_URI is not defined!')
        }
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('🍀 Connection to MongoDB established!')
    } catch (error) {
        console.log('❌ MongoDB connection error:', error)
    }
}