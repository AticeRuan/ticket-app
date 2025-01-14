'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useAuthContext } from '../(context)/AuthContext'
import CustomInput from './common/CustomInput'
import { icons } from '../(utils)/constants'

export const LoginForm = ({ onFormTypeChange, onClose }) => {
  const { login, loading, error } = useAuthContext()
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleFormTypeChange = () => {
    onFormTypeChange('signup')
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(formData.email, formData.password)
    if (success) {
      router.push('/workspace/dashboard')
    }
  }

  return (
    <div className="flex justify-center py-8 md:py-16 lg:py-20 flex-col items-center bg-chill-light-orange rounded-2xl relative max-w-lg mx-auto px-2 sm:px-4 md:px-32 max-h-screen">
      {isHomePage && (
        <button
          className="w-4 h-4 md:w-8 md:h-8 absolute top-2 left-2 md:top-6 md:left-6 transition-transform hover:scale-110"
          onClick={onClose}
        >
          {icons.BackIcon({ color: '#E65F2B' })}
        </button>
      )}

      <form
        className="flex flex-col w-[300px] sm:w-[500px] px-4 md:px-6 gap-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Login</h3>

        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
          label="Email"
        />

        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full"
          label="Password"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-chill-orange text-white py-3 rounded-full mt-4 hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </form>

      <div className="text-center mt-6">
        <p className="text-sm">
          Don&apos;t have an account?{' '}
          <button
            className="text-chill-orange hover:opacity-70 font-medium"
            onClick={handleFormTypeChange}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}

export const SignupForm = ({ onFormTypeChange, onClose }) => {
  const { signup, loading, error } = useAuthContext()
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [secretKey, setSecretKey] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await signup(formData, secretKey)
    if (success) {
      router.push('/workspace/dashboard')
    }
  }

  const handleFormTypeChange = () => {
    onFormTypeChange('login')
  }

  return (
    <div className="flex justify-center py-8 md:py-16 lg:py-20 flex-col items-center bg-chill-light-orange rounded-2xl relative max-w-lg mx-auto px-2 sm:px-4 md:px-32 max-h-screen">
      {isHomePage && (
        <button
          className="w-4 h-4 md:w-8 md:h-8 absolute top-2 left-2 md:top-6 md:left-6 transition-transform hover:scale-110"
          onClick={onClose}
        >
          {icons.BackIcon({ color: '#E65F2B' })}
        </button>
      )}
      <form
        className="flex flex-col w-[300px] sm:w-[500px] px-4 md:px-6 gap-4"
        onSubmit={handleSubmit}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Sign Up</h3>

        <CustomInput
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full "
          label="Name"
        />

        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full"
          label="Email"
        />

        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="w-full"
          label="Password"
        />

        <CustomInput
          type="password"
          name="secretKey"
          placeholder="Enter registration secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required
          className="w-full"
          label="Secret Key"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-chill-orange text-white py-3 rounded-full mt-4 hover:bg-opacity-90 transition-colors disabled:opacity-50"
        >
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
        )}
      </form>

      <div className="text-center mt-6">
        <p className="text-sm">
          Already have an account?{' '}
          <button
            className="text-chill-orange hover:opacity-70 font-medium"
            onClick={handleFormTypeChange}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}
