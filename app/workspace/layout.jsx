'use client'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../(components)/CustomHeader'
import Nav from '../(components)/Nav'
import { useAuthContext } from '../(context)/AuthContext'

import { useTicketContext } from '../(context)/TicketContext'
import { useProjectContext } from '../(context)/ProjectContext'
import { useUserContext } from '../(context)/UserContext'
import Loading from '../(components)/common/Loading'
import Modal from '../(components)/common/Modal'
import { LoginForm, SignupForm } from '../(components)/AuthForm'

const WorkspaceLayout = ({ children }) => {
  const { user, loading: authLoading, isAuthenticated } = useAuthContext()
  const { fetchUsers, loading: usersLoading } = useUserContext()
  const { fetchTickets, loading: ticketsLoading } = useTicketContext()
  const { fetchProjects, loading: projectsLoading } = useProjectContext()

  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)
  const [loadingMessage, setLoadingMessage] = useState('')

  useEffect(() => {
    if (usersLoading) {
      setLoadingMessage('Fetching Team Members Detail')
    }
    if (ticketsLoading) {
      setLoadingMessage('Fetching Tickets Detail')
    }
    if (projectsLoading) {
      setLoadingMessage('Fetching Projects Detail')
    }
    if (!usersLoading && !ticketsLoading && !projectsLoading) {
      setLoadingMessage('')
    }
    if (authLoading) {
      setLoadingMessage('Authenticating User')
    }
  }, [usersLoading, ticketsLoading, projectsLoading, authLoading])
  useEffect(() => {
    // If not authenticated and not loading, show auth modal
    if (!authLoading && !isAuthenticated) {
      setShowAuthModal(true)
    } else {
      setShowAuthModal(false)
    }
  }, [isAuthenticated, authLoading])

  useEffect(() => {
    // Only fetch data if we have an authenticated user
    if (user && isAuthenticated) {
      const fetchData = async () => {
        await Promise.all([fetchTickets(), fetchProjects(), fetchUsers()])
      }
      fetchData()
    }
  }, [user, isAuthenticated])
  // Show loading while initial data is being fetched
  if (authLoading) {
    return (
      <div className="w-screen flex justify-center items-center bg-gradient-radial from-chill-light-orange to-white flex-col">
        <Loading message={loadingMessage} />
      </div>
    )
  }

  // Show loading while initial data is being fetched
  if (isAuthenticated && (usersLoading || ticketsLoading || projectsLoading)) {
    return (
      <div className="w-screen flex justify-center items-center bg-gradient-radial from-chill-light-orange to-white flex-col">
        <Loading message={loadingMessage} />
      </div>
    )
  }

  const handleAuthFormSwitch = (formType) => {
    setIsLoginForm(formType === 'login')
  }

  return (
    <div className="flex  h-full w-screen relative">
      <Modal
        isOpen={showAuthModal}
        onClose={() => {
          // Only allow closing if authenticated
          if (isAuthenticated) {
            setShowAuthModal(false)
          }
        }}
      >
        {isLoginForm ? (
          <LoginForm
            onFormTypeChange={() => handleAuthFormSwitch('signup')}
            onClose={() => {
              if (isAuthenticated) {
                setShowAuthModal(false)
              }
            }}
          />
        ) : (
          <SignupForm
            onFormTypeChange={() => handleAuthFormSwitch('login')}
            onClose={() => {
              if (isAuthenticated) {
                setShowAuthModal(false)
              }
            }}
          />
        )}
      </Modal>
      <Nav />
      <div className="flex-grow flex flex-col overflow-y-auto bg-chill-light-orange h-full pt-[100px]">
        <CustomHeader />
        {children}
      </div>
    </div>
  )
}

export default WorkspaceLayout
