import { useEffect } from 'react'
import { NavBar } from './components/NavBar.tsx'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { SignupPage } from './pages/SignupPage.tsx'
import { SettingPage } from './pages/SettingsPage.tsx'
import { ProfilePage } from './pages/ProfilePage.tsx'
import { useAuthStore } from './store/useAthStore.ts'

const App = () => {
    const { authUser, checkAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    console.log({authUser})

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingPage />} />
            </Routes>
        </>
    )
}

export default App
