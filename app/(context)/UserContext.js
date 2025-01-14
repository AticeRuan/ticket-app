'use client'
import { createContext, useContext, useReducer, useCallback } from 'react'
import { fetchWithAuth } from '../(utils)/fetchWithAuth'

// Initial state
const initialState = {
  users: [],
  loading: false,
  error: null,
}

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_USERS: 'SET_USERS',
  UPDATE_USER: 'UPDATE_USER',
}

// Reducer function
const userReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_USERS:
      return { ...state, users: action.payload }
    case ACTIONS.UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user,
        ),
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
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users`,
      )

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
  }, [])

  // Change user role
  const changeUserRole = useCallback(async (userId, role) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${userId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ action: 'changeRole', role }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

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
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${userId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            action: 'changePassword',
            currentPassword,
            newPassword,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

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
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${userId}`,
        {
          method: 'PATCH',
          body: JSON.stringify({ action: 'resetPassword' }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

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
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${userId}`,
        {
          method: 'DELETE',
        },
      )

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

  const value = {
    users: state.users,
    loading: state.loading,
    error: state.error,
    fetchUsers,
    changeUserRole,
    changePassword,
    resetPassword,
    deleteUser,
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
