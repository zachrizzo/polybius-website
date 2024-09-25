// /pages/auth/signup.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '../../../firebase/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { Alert } from '@/components/ui/Alert';
import {
    EyeIcon,
    EyeOffIcon,
    LockIcon,
    UserIcon,
    UserPlusIcon
} from 'lucide-react';

const programmingLanguages = [
    'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Rust', 'TypeScript', 'PHP', 'Swift'
];

const countries = [
    'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Brazil', 'India', 'China'
];

export default function SignUp() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        confirmEmail: '',
        password: '',
        confirmPassword: '',
        companyName: '',
        programmingLangs: [],
        country: '',
        city: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const validateInputs = () => {
        let tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (step === 1) {
            if (!formData.email) {
                tempErrors.email = 'Email is required.';
            } else if (!emailRegex.test(formData.email)) {
                tempErrors.email = 'Enter a valid email address.';
            }
            if (!formData.confirmEmail) {
                tempErrors.confirmEmail = 'Please confirm your email.';
            } else if (formData.email !== formData.confirmEmail) {
                tempErrors.confirmEmail = 'Emails do not match.';
            }
        } else {
            if (!formData.firstName.trim()) tempErrors.firstName = 'First name is required.';
            if (!formData.lastName.trim()) tempErrors.lastName = 'Last name is required.';
            if (!formData.password) {
                tempErrors.password = 'Password is required.';
            } else if (formData.password.length < 8) {
                tempErrors.password = 'Password must be at least 8 characters.';
            } else if (!passwordRegex.test(formData.password)) {
                tempErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.';
            }
            if (!formData.confirmPassword) {
                tempErrors.confirmPassword = 'Please confirm your password.';
            } else if (formData.password !== formData.confirmPassword) {
                tempErrors.confirmPassword = 'Passwords do not match.';
            }
            if (!formData.companyName.trim()) tempErrors.companyName = 'Company name is required.';
            if (formData.programmingLangs.length === 0) tempErrors.programmingLangs = 'Please select at least one programming language.';
            if (!formData.country) tempErrors.country = 'Please select a country.';
            if (!formData.city.trim()) tempErrors.city = 'City is required.';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleNextStep = (e) => {
        e.preventDefault();
        if (validateInputs()) {
            setStep(2);
        }
    };

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (validateInputs()) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                const user = userCredential.user;

                // Store additional user data in Firestore
                await setDoc(doc(db, 'users', user.uid), {
                    userId: user.uid,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    companyName: formData.companyName,
                    programmingLangs: formData.programmingLangs,
                    country: formData.country,
                    city: formData.city,
                    createdAt: new Date(),
                });

                console.log('User created with UID:', user.uid);
                router.push('/dashboard');
            } catch (error) {
                console.error('Error creating user:', error);
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    general: error.message,
                }));
            }
        }
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const fillTestData = () => {
        setFormData({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            confirmEmail: 'john.doe@example.com',
            password: 'Password123!',
            confirmPassword: 'Password123!',
            companyName: 'Acme Inc',
            programmingLangs: ['JavaScript', 'Python'],
            country: 'United States',
            city: 'New York'
        });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <Card className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    <LockIcon className="w-12 h-12 text-blue-500" />
                    <h2 className="text-2xl font-bold mt-4">Create an Account</h2>
                    <p className="text-center text-gray-600 mt-2">
                        {step === 1 ? 'Enter your email to get started' : 'Complete your profile'}
                    </p>
                </div>
                {errors.general && (
                    <Alert type="error" message={errors.general} />
                )}
                {step === 1 ? (
                    <form onSubmit={handleNextStep} className="mt-6">
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
                                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <Label htmlFor="confirmEmail">Confirm Email</Label>
                                <Input
                                    id="confirmEmail"
                                    type="email"
                                    placeholder="Confirm your email"
                                    value={formData.confirmEmail}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.confirmEmail && <p className="text-sm text-red-500 mt-1">{errors.confirmEmail}</p>}
                            </div>
                            <Button type="submit" className="w-full">
                                Next
                            </Button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleSignUp} className="mt-6">
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="John"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Doe"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                    {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
                                </div>
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
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
                                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOffIcon className="h-5 w-5" />
                                        ) : (
                                            <EyeIcon className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword}</p>}
                            </div>
                            <div>
                                <Label htmlFor="companyName">Company Name</Label>
                                <Input
                                    id="companyName"
                                    type="text"
                                    placeholder="Enter your company name"
                                    value={formData.companyName}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.companyName && <p className="text-sm text-red-500 mt-1">{errors.companyName}</p>}
                            </div>
                            <div>
                                <Label htmlFor="programmingLangs">Programming Languages</Label>
                                <Select
                                    multiple
                                    options={programmingLanguages}
                                    selected={formData.programmingLangs}
                                    onChange={(selected) => handleSelectChange('programmingLangs', selected)}
                                    placeholder="Select languages"
                                />
                                {errors.programmingLangs && <p className="text-sm text-red-500 mt-1">{errors.programmingLangs}</p>}
                            </div>
                            <div>
                                <Label htmlFor="country">Country</Label>
                                <Select
                                    options={countries}
                                    selected={formData.country}
                                    onChange={(selected) => handleSelectChange('country', selected)}
                                    placeholder="Select country"
                                    required
                                />
                                {errors.country && <p className="text-sm text-red-500 mt-1">{errors.country}</p>}
                            </div>
                            <div>
                                <Label htmlFor="city">City</Label>
                                <Input
                                    id="city"
                                    type="text"
                                    placeholder="Enter your city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    required
                                />
                                {errors.city && <p className="text-sm text-red-500 mt-1">{errors.city}</p>}
                            </div>
                            <Button type="submit" className="w-full flex items-center justify-center">
                                <UserPlusIcon className="mr-2 h-4 w-4" /> Sign Up
                            </Button>
                        </div>
                    </form>
                )}
                <div className="mt-6 flex flex-col space-y-4">
                    {step === 2 && (
                        <Button variant="outline" className="w-full" onClick={() => router.push('/auth/login')}>
                            <UserIcon className="mr-2 h-4 w-4" /> Already have an account? Login
                        </Button>
                    )}
                    <Button variant="secondary" className="w-full" onClick={fillTestData}>
                        <UserIcon className="mr-2 h-4 w-4" /> Fill Test Data
                    </Button>
                </div>
            </Card>
        </div>
    );
}
