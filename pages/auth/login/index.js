// /pages/auth/login.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import { EyeIcon, EyeOffIcon, LogInIcon } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;
            console.log('Logged in with UID:', user.uid);
            router.push('/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600">
            <Card className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <LogInIcon className="w-12 h-12 text-green-500" />
                    <h2 className="text-2xl font-bold mt-4">Login</h2>
                    <p className="text-center text-gray-600 mt-2">
                        Welcome back! Please enter your credentials.
                    </p>
                </div>
                {error && (
                    <Alert type="error" message={error} />
                )}
                <form onSubmit={handleSubmit} className="mt-6">
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-5 w-5" />
                                    ) : (
                                        <EyeIcon className="h-5 w-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                        <Button type="submit" className="w-full flex items-center justify-center">
                            <LogInIcon className="mr-2 h-4 w-4" /> Log In
                        </Button>
                    </div>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <a href="/auth/signup" className="text-blue-500 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </Card>
        </div>
    );
}
