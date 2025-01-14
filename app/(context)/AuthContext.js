'use client'
import { createContext, useContext, useReducer, useEffect } from 'react'
import jwt from 'jsonwebtoken'

// Initial state
const initialState = {
  user: null,
  loading: false,
  error: null,
}

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  CLEAR_USER: 'CLEAR_USER',
}

// Reducer function
const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,

        error: null,
      }
    case ACTIONS.CLEAR_USER:
      return {
        ...state,
        user: null,
      }
    default:
      return state
  }
}

// Create context
const AuthContext = createContext(null)

// Context provider component
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // Login user
  const login = async (email, password) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetch('/api/Auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token)

      dispatch({
        type: ACTIONS.SET_USER,
        payload: { ...data.user, token: data.token },
      })
      return true
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      return false
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: ACTIONS.CLEAR_USER })
  }

  // Sign up new user and auto login
  const signup = async (userData, secretKey) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })

      // First create the user
      const signupRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            formData: {
              ...userData,
              secretKey,
            },
          }),
        },
      )

      const signupData = await signupRes.json()

      if (!signupRes.ok) {
        throw new Error(signupData.message || 'Signup failed')
      }

      // After successful signup, automatically log the user in
      const loginRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Auth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
          }),
        },
      )

      const loginData = await loginRes.json()

      if (!loginRes.ok) {
        throw new Error(loginData.message || 'Auto-login failed')
      }

      // Store token and update state
      localStorage.setItem('token', loginData.token)
      dispatch({
        type: ACTIONS.SET_USER,
        payload: { ...loginData.user, token: loginData.token },
      })

      return true
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      return false
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Initialize authentication state from token
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const decoded = jwt.decode(token)
          if (decoded) {
            dispatch({
              type: ACTIONS.SET_USER,
              payload: { ...decoded, token },
            })
          }
        } catch (error) {
          localStorage.removeItem('token')
          dispatch({ type: ACTIONS.CLEAR_USER })
        }
      }
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }

    initializeAuth()
  }, [])

  const value = {
    user: state.user,
    loading: state.loading,
    error: state.error,
    login,
    logout,
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Custom hook to use the auth context
export const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}
