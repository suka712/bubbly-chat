import { useEffect } from 'react'
import { NavBar } from './components/NavBar.tsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import SettingPage from './pages/SettingsPage.tsx'
import ProfilePage from './pages/ProfilePage.tsx'
import { useAuthStore } from './store/useAthStore.ts'
import { Loader } from 'lucide-react'

const App = () => {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    console.log({ authUser })

    if (isCheckingAuth && !authUser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader className="size-10 animate-spin" />
            </div>
        )
    }

    return (
        <div>
            <NavBar />
            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={authUser ? <SettingPage /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    )
}

export default App
