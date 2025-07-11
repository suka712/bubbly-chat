import { NavBar } from './Components/NavBar'
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './Pages/HomePage.tsx'
import { LoginPage } from './Pages/LoginPage.tsx'
import { RegisterPage } from './Pages/RegisterPage.tsx'
import { SettingPage } from './Pages/SettingsPage.tsx'
import { ProfilePage } from './Pages/ProfilePage.tsx'

const App = () => {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingPage />} />
            </Routes>
        </>
    )
}

export default App
