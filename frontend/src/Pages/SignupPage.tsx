import { useState } from 'react'
import { useAuthStore } from '../store/useAthStore'
import { MessageSquare, Rabbit, Mail, Lock, Eye, EyeOff } from 'lucide-react'

const SignupPage = () => {
    const [showPassword, setPassword] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    })

    // const { signup, isSigningUp } = useAuthStore()

    const validateForm = () => {}
    const handleSubmit = (e: any) => {
        e.preventDefault()
    }

    return (
        <div className="min-h-screen grid lg:grid-cols-[1.2fr_1fr]">
            {/* Login form */}
            <div className="flex flex-col justify-center items-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="flex flex-col items-center gap-2 group">
                            <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                <MessageSquare className="size-6 text-primary" />
                            </div>
                            <h1 className="text-2xl font-bold mt-2">Create Account</h1>
                            <p className="text-base-content/60">Get started with your free account</p>
                        </div>
                    </div>
                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username */}
                        <div className="form-control">
                            <label className="label mb-2">
                                <span className="label-text font-medium">Full Name</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                                        <Rabbit className="size-6" style={{ strokeWidth: 1 }} />
                                    </div>
                                </div>
                                <input type="text" className={`input input-bordered w-full pl-10`} placeholder="Bruce Wayne" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="form-control mb-4">
                            <label className="label mb-2">
                                <span className="label-text font-medium">Email</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                                    <Mail className="size-6" style={{ strokeWidth: 1 }} />
                                </div>
                                <input type="email" className={`input input-bordered w-full pl-10`} placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                            </div>
                        </div> abc
                        {/* XPassword X*/}
                        <div className="form-control mb-4">
                            <label className="label mb-2">
                                <span className="label-text font-medium">Password</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center z-10">
                                    <Lock className="size-6" style={{ strokeWidth: 1 }} />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input input-bordered w-full pl-10`}
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* Left card */}
            <div className="flex items-center justify-center h-full">
                <div className="flex justify-center items-center card w-96 bg-base-100 shadow-sm p-6 sm:p-12">
                    <div className="card-body">
                        <span className="badge badge-xs badge-warning">Most Popular</span>
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-bold">Premium</h2>
                            <span className="text-xl">$29/mo</span>
                        </div>
                        <ul className="mt-6 flex flex-col gap-2 text-xs">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>High-resolution image generation</span>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Customizable style templates</span>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Batch processing capabilities</span>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span>AI-driven image enhancements</span>
                            </li>
                            <li className="opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="line-through">Seamless cloud integration</span>
                            </li>
                            <li className="opacity-50">
                                <svg xmlns="http://www.w3.org/2000/svg" className="size-4 me-2 inline-block text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                                <span className="line-through">Real-time collaboration tools</span>
                            </li>
                        </ul>
                        <div className="mt-6">
                            <button className="btn btn-primary btn-block">Subscribe</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
