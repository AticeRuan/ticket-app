'use client'
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react'
import { fetchWithAuth } from '../(utils)/fetchWithAuth'
import jwt from 'jsonwebtoken'

// Initial state
const initialState = {
  user: null,
  users: [],
  loading: false,
  error: null,
  token: null,
  isAuthenticated: false,
}

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USER: 'SET_USER',
  SET_USERS: 'SET_USERS',
  CLEAR_USER: 'CLEAR_USER',
  UPDATE_USER: 'UPDATE_USER',
}

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        error: null,
      }
    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload }
    case ACTIONS.CLEAR_USER:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        ),
        user:
          state.user?._id === action.payload._id ? action.payload : state.user,
      }
    default:
      return state
  }
}

// Create context
const UserContext = createContext(null)

// Context provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState)

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth('/api/Users')

      if (!res.ok) {
        throw new Error('Failed to fetch users')
      }

      const data = await res.json()
      dispatch({ type: ACTIONS.SET_USERS, payload: data.users })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, []) // Empty dependency array since it only depends on dispatch which is stable

  // Memoize other functions similarly...
  const changeUserRole = useCallback(async (userId, role) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(`/api/Users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ action: 'changeRole', role }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to change user role')
      }

      const userRes = await fetchWithAuth(`/api/Users/${userId}`)
      const { user } = await userRes.json()

      dispatch({ type: ACTIONS.UPDATE_USER, payload: user })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }, [])

  // Change password
  const changePassword = async (userId, currentPassword, newPassword) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetch(`/api/Users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          action: 'changePassword',
          currentPassword,
          newPassword,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.message || 'Failed to change password')
      }

      return true
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      return false
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Reset user password
  const resetPassword = async (userId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetch(`/api/Users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ action: 'resetPassword' }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to reset password')
      }

      return true
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      return false
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Delete user (soft delete)
  const deleteUser = async (userId) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetch(`/api/Users/${userId}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        throw new Error('Failed to delete user')
      }

      // Update users list by removing the deleted user
      dispatch({
        type: ACTIONS.SET_USERS,
        payload: state.users.filter((user) => user._id !== userId),
      })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

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
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  // Logout user
  const logout = () => {
    localStorage.removeItem('token')
    dispatch({ type: ACTIONS.CLEAR_USER })
  }

  // Sign up new user
  const signup = async (userData, secretKey) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetch('/api/Users', {
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
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Signup failed')
      }

      return true
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      return false
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

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
    users: state.users,
    loading: state.loading,
    error: state.error,
    isAuthenticated: state.isAuthenticated,
    fetchUsers,
    changeUserRole,
    changePassword,
    resetPassword,
    deleteUser,
    login,
    logout,
    signup,
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

// Custom hook to use the user context
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }
  return context
}
