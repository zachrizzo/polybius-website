'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { EyeIcon, EyeOffIcon, LockIcon, UserIcon, LogInIcon, UserPlusIcon } from 'lucide-react'
import { initializeApp } from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

// Initialize Firebase (replace with your config)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const programmingLanguages = [
  'JavaScript', 'Python', 'Java', 'C++', 'Ruby', 'Go', 'Rust', 'TypeScript', 'PHP', 'Swift'
]

const countries = [
  'United States', 'Canada', 'United Kingdom', 'Germany', 'France', 'Japan', 'Australia', 'Brazil', 'India', 'China'
]

export function SignupFlow() {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [confirmEmail, setConfirmEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [companyName, setCompanyName] = useState('')
  const [programmingLangs, setProgrammingLangs] = useState([])
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const validateInputs = () => {
    let tempErrors = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

    if (step === 1) {
      if (!email) {
        tempErrors.email = 'Email is required.'
      } else if (!emailRegex.test(email)) {
        tempErrors.email = 'Enter a valid email address.'
      }
      if (!confirmEmail) {
        tempErrors.confirmEmail = 'Please confirm your email.'
      } else if (email !== confirmEmail) {
        tempErrors.confirmEmail = 'Emails do not match.'
      }
    } else {
      if (!firstName.trim()) tempErrors.firstName = 'First name is required.'
      if (!lastName.trim()) tempErrors.lastName = 'Last name is required.'
      if (!password) {
        tempErrors.password = 'Password is required.'
      } else if (password.length < 8) {
        tempErrors.password = 'Password must be at least 8 characters.'
      } else if (!passwordRegex.test(password)) {
        tempErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.'
      }
      if (!confirmPassword) {
        tempErrors.confirmPassword = 'Please confirm your password.'
      } else if (password !== confirmPassword) {
        tempErrors.confirmPassword = 'Passwords do not match.'
      }
      if (!companyName.trim()) tempErrors.companyName = 'Company name is required.'
      if (programmingLangs.length === 0) tempErrors.programmingLangs = 'Please select at least one programming language.'
      if (!country) tempErrors.country = 'Please select a country.'
      if (!city.trim()) tempErrors.city = 'City is required.'
    }

    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0;
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    if (validateInputs()) {
      setStep(2)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    if (validateInputs()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Store additional user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          userId: user.uid,
          firstName,
          lastName,
          email,
          companyName,
          programmingLangs,
          country,
          city,
          createdAt: new Date(),
        })

        console.log('User created with UID:', user.uid)
        router.push('/dashboard')
      } catch (error) {
        console.error('Error creating user:', error)
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: error.message,
        }))
      }
    }
  }

  const handleRouteLogin = () => {
    router.push('/login')
  }

  const fillTestData = () => {
    setFirstName('John')
    setLastName('Doe')
    setEmail('john.doe@example.com')
    setConfirmEmail('john.doe@example.com')
    setPassword('Password123!')
    setConfirmPassword('Password123!')
    setCompanyName('Acme Inc')
    setProgrammingLangs(['JavaScript', 'Python'])
    setCountry('United States')
    setCity('New York')
  }

  return (
    (<div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center">
            <LockIcon className="w-12 h-12 text-primary" />
          </div>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? 'Enter your email to get started' : 'Complete your profile'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {errors.general && (
            <Alert variant="destructive">
              <AlertDescription>{errors.general}</AlertDescription>
            </Alert>
          )}
          {step === 1 ? (
            <form onSubmit={handleNextStep}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmEmail">Confirm Email</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    placeholder="Confirm your email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required />
                  {errors.confirmEmail && <p className="text-sm text-red-500">{errors.confirmEmail}</p>}
                </div>
                <Button type="submit" className="w-full">Next</Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required />
                    {errors.firstName && <p className="text-sm text-red-500">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required />
                    {errors.lastName && <p className="text-sm text-red-500">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? (
                        <EyeOffIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input
                    id="companyName"
                    type="text"
                    placeholder="Enter your company name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    required />
                  {errors.companyName && <p className="text-sm text-red-500">{errors.companyName}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="programmingLangs">Programming Languages</Label>
                  <Select onValueChange={(value) => setProgrammingLangs(value.split(','))} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select languages" />
                    </SelectTrigger>
                    <SelectContent>
                      {programmingLanguages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.programmingLangs && <p className="text-sm text-red-500">{errors.programmingLangs}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select onValueChange={setCountry} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    type="text"
                    placeholder="Enter your city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required />
                  {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                </div>
                <Button type="submit" className="w-full">
                  <UserPlusIcon className="mr-2 h-4 w-4" /> Sign Up
                </Button>
              </div>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button variant="outline" className="w-full" onClick={handleRouteLogin}>
            <LogInIcon className="mr-2 h-4 w-4" /> Already have an account? Login
          </Button>
          <Button variant="secondary" className="w-full" onClick={fillTestData}>
            <UserIcon className="mr-2 h-4 w-4" /> Fill Test Data
          </Button>
        </CardFooter>
      </Card>
    </div>)
  );
}