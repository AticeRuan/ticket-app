'use client'
import { createContext, useContext, useReducer } from 'react'
import { fetchWithAuth } from '../(utils)/fetchWithAuth'
// Initial state
const initialState = {
  tickets: [],
  loading: false,
  error: null,
}

// Action types
export const ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_TICKETS: 'SET_TICKETS',
  ADD_TICKET: 'ADD_TICKET',
  UPDATE_TICKET: 'UPDATE_TICKET',
  DELETE_TICKET: 'DELETE_TICKET',
}

// Reducer function
const ticketReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload }
    case ACTIONS.SET_TICKETS:
      return { ...state, tickets: action.payload }
    case ACTIONS.ADD_TICKET:
      return { ...state, tickets: [...state.tickets, action.payload] }
    case ACTIONS.UPDATE_TICKET:
      return {
        ...state,
        tickets: state.tickets.map((ticket) =>
          ticket._id === action.payload._id ? action.payload : ticket,
        ),
      }
    case ACTIONS.DELETE_TICKET:
      return {
        ...state,
        tickets: state.tickets.filter(
          (ticket) => ticket._id !== action.payload,
        ),
      }
    default:
      return state
  }
}

// Create context
const TicketContext = createContext(null)

// Context provider component
export const TicketProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ticketReducer, initialState)

  // API actions
  const fetchTickets = async () => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Tickets`,
        {
          cache: 'no-store',
        },
      )

      if (!res.ok) {
        throw new Error('Failed to fetch tickets')
      }

      const data = await res.json()
      dispatch({ type: ACTIONS.SET_TICKETS, payload: data.tickets })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const createTicket = async (formData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Tickets`,
        {
          method: 'POST',
          body: JSON.stringify({ formData }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!res.ok) {
        throw new Error('Failed to create ticket')
      }

      dispatch({ type: ACTIONS.ADD_TICKET, payload: formData })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const updateTicket = async (id, formData) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Tickets/${id}`,
        {
          method: 'PUT',
          body: JSON.stringify({ formData }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )

      if (!res.ok) {
        throw new Error('Failed to update ticket')
      }

      dispatch({
        type: ACTIONS.UPDATE_TICKET,
        payload: { _id: id, ...formData },
      })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const deleteTicket = async (id) => {
    try {
      dispatch({ type: ACTIONS.SET_LOADING, payload: true })
      const res = await fetchWithAuth(
        `${process.env.NEXT_PUBLIC_API_URL}/api/Tickets/${id}`,
        {
          method: 'DELETE',
        },
      )

      if (!res.ok) {
        throw new Error('Failed to delete ticket')
      }

      dispatch({ type: ACTIONS.DELETE_TICKET, payload: id })
    } catch (err) {
      dispatch({ type: ACTIONS.SET_ERROR, payload: err.message })
    } finally {
      dispatch({ type: ACTIONS.SET_LOADING, payload: false })
    }
  }

  const value = {
    tickets: state.tickets,
    loading: state.loading,
    error: state.error,
    fetchTickets,
    createTicket,
    updateTicket,
    deleteTicket,
  }

  return (
    <TicketContext.Provider value={value}>{children}</TicketContext.Provider>
  )
}

// Custom hook to use the ticket context
export const useTicketContext = () => {
  const context = useContext(TicketContext)
  if (!context) {
    throw new Error('useTicketContext must be used within a TicketProvider')
  }
  return context
}
