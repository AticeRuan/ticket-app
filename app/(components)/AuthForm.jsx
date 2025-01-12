// app/(components)/AuthForms.jsx
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUserContext } from '../(context)/UserContext'

export const LoginForm = () => {
  const { login, loading, error } = useUserContext()
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

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
      router.push('/')
    }
  }

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-4">Login</h3>

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <button type="submit" disabled={loading} className="btn mt-4">
          {loading ? 'Logging in...' : 'Login'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  )
}

export const SignupForm = () => {
  const { signup, loading, error } = useUserContext()
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
      router.push('/login')
    }
  }

  return (
    <div className="flex justify-center">
      <form className="flex flex-col gap-3 w-1/2" onSubmit={handleSubmit}>
        <h3 className="text-2xl font-bold mb-4">Sign Up</h3>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
          className="p-2 border rounded"
        />

        <label>Secret Key</label>
        <input
          type="password"
          name="secretKey"
          placeholder="Enter registration secret key"
          value={secretKey}
          onChange={(e) => setSecretKey(e.target.value)}
          required
          className="p-2 border rounded"
        />

        <button type="submit" disabled={loading} className="btn mt-4">
          {loading ? 'Creating Account...' : 'Sign Up'}
        </button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  )
}
