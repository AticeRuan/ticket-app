// app/(components)/AuthForms.jsx
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../(context)/AuthContext'
import CustomInput from './common/CustomInput'

import { icons } from '../(utils)/constants'

export const LoginForm = ({ onFormTypeChange, onClose }) => {
  const { login, loading, error } = useAuthContext()
  const router = useRouter()
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
    <div className="flex justify-center py-32 flex-col items-center bg-chill-light-orange rounded-2xl relative ">
      <button className="w-8 h-8 absolute top-10 left-10  " onClick={onClose}>
        {' '}
        {icons.BackIcon({ color: '#E65F2B' })}
      </button>
      <form className="flex flex-col  w-1/2 gap-4" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-4">Login</h3>

        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 "
          label="Email"
        />
        <CustomInput
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-2 "
          label="Password"
        />

        <button type="submit" disabled={loading} className="btn mt-4">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <div className="text-center mt-4">
        <p>
          Don&apos;t have an account?
          <button
            className="text-chill-orange hover:opacity-70 ml-1"
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
    <div className="flex justify-center py-32 flex-col items-center bg-chill-light-orange rounded-2xl relative">
      <button className="w-8 h-8 absolute top-10 left-10 " onClick={onClose}>
        {' '}
        {icons.BackIcon({ color: '#E65F2B' })}
      </button>
      <form className="flex flex-col gap-3 w-1/2 " onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-4">Sign Up</h3>

        <CustomInput
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
          label="Name"
        />
        <CustomInput
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
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
          className="p-2 border rounded"
          label="Password"
        />
        <CustomInput
          type="password"
          name="secretKey"
          placeholder="Enter registration secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required
          className="p-2 border rounded"
          label="Secret Key"
        />

        <button type="submit" disabled={loading} className="btn mt-4">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
      <div className="text-center mt-4">
        <p>
          Already have an account?
          <button
            onClick={handleFormTypeChange}
            className="text-chill-orange hover:opacity-70 ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  )
}
