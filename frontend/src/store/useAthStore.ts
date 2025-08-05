import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create<AuthStore>()((set) => ({
    authUser: {
        username: String,
        email: String,
        profilePicture: String,
    },
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get('/auth/check')
            set({ authUser: res.data })
        } catch (error) {
            console.log('Error in checkAuth:', error)
            set({ authUser: null })
        } finally {
            set({ isCheckingAuth: false })
        }
    },

    signup: async (signupData: {
        username: string,
        email: string,
        password: string,
    }) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post('/auth/signup', signupData, { withCredentials: true })
            set({
                authUser: {
                    username: res.data.username,
                    email: res.data.email,
                    profilePicture: res.data.profilePicture,
                },
            })
            toast.success(res.data.message)
        } catch (error: any) {
            toast.error('Error signing up:', error)
            console.log('Something is broken in signup')
        } finally {
            set({ isSigningUp: false })
        }
    },

    login: async (loginData: { username: string; password: string }): Promise<boolean> => {
        set({ isLoggingIn: true })
        let isSuccessful = false
        try {
            const res = await axiosInstance.post('/auth/login', loginData, { withCredentials: true })
            set({
                authUser: {
                    username: res.data.username,
                    email: res.data.email,
                    profilePicture: res.data.profilePicture,
                },
            })
            isSuccessful = true
            toast.success('Logged in successfully!')
        } catch (error: any) {
            toast.error('Error logging in.')
            console.log('Something is broken in login')
        } finally {
            set({ isLoggingIn: false })
            return isSuccessful
        }
    },

    logout: async () => {
        try {
            await axiosInstance.get('/auth/logout')
            set({ authUser: null })
            toast.success('Successfully logged out!')
        } catch (error) {
            toast.error('Error logging out!')
        }
    },
}))

interface AuthStore {
    authUser: any
    isSigningUp: boolean
    isLoggingIn: boolean
    isUpdatingProfile: boolean
    isCheckingAuth: boolean
    checkAuth: () => Promise<void>
    signup: (data: any) => Promise<void>
    login: (data: any) => Promise<boolean>
    logout: () => void
}
