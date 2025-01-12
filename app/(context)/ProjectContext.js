'use client'
import { createContext, useContext, useReducer } from 'react'
import { fetchWithAuth } from '../(utils)/fetchWithAuth'
// Initial state
const initialState = {
  projects: [],
  loading: false,
  error: null,
}

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_PROJECTS: 'SET_PROJECTS',
  ADD_PROJECT: 'ADD_PROJECT',
  UPDATE_PROJECT: 'UPDATE_PROJECT',
  DELETE_PROJECT: 'DELETE_PROJECT',
}

// Reducer function
const projectReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_PROJECTS:
      return { ...state, projects: action.payload }
    case ACTIONS.ADD_PROJECT:
      return { ...state, projects: [...state.projects, action.payload] }
    case ACTIONS.UPDATE_PROJECT:
      return {
        ...state,
        projects: state.projects.map((project) =>
          project._id === action.payload._id ? action.payload : project,
        ),
      }
    case ACTIONS.DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload,
        ),
      }
    default:
      return state
  }
}

// Create context
const ProjectContext = createContext(null)

// Context provider component
export const ProjectProvider = ({ children }) => {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // API actions
  const fetchProjects = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Projects`,
        {
          cache: 'no-store',
        },
      )

      if (!res.ok) {
        throw new Error('Failed to fetch projects')
      }

      const data = await res.json()
      dispatch({ type: ACTIONS.SET_PROJECTS, payload: data.projects })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const createProject = async (formData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth('/api/Projects', {
        method: 'POST',
        body: JSON.stringify({ formData }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to create project')
      }

      const data = await res.json()
      dispatch({ type: ACTIONS.ADD_PROJECT, payload: data.project })
      return data.project // Return the created project
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      throw err // Re-throw to handle in the component
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const updateProject = async (id, formData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(`/api/Projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ formData }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!res.ok) {
        throw new Error('Failed to update project')
      }

      const data = await res.json()
      dispatch({
        type: ACTIONS.UPDATE_PROJECT,
        payload: { _id: id, ...data.project },
      })
      return data.project // Return the updated project
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      throw err
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const deleteProject = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Projects/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (!res.ok) {
        throw new Error('Failed to delete project')
      }

      dispatch({ type: ACTIONS.DELETE_PROJECT, payload: id })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      throw err
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const getProjectById = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(`/api/Projects/${id}`)

      if (!res.ok) {
        throw new Error('Failed to fetch project')
      }

      const data = await res.json()
      return data
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
      throw err
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const value = {
    projects: state.projects,
    loading: state.loading,
    error: state.error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    getProjectById,
  }

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  )
}

// Custom hook to use the project context
export const useProjectContext = () => {
  const context = useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}
