'use client'
import React, { useEffect, useState } from 'react'
import CustomHeader from '../(components)/CustomHeader'
import Nav from '../(components)/Nav'
import { useAuthContext } from '../(context)/AuthContext'
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [isLoginForm, setIsLoginForm] = useState(true)
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
      <div className="w-screen">
        <Loading />
      </div>
    )
  }

  // Show loading while initial data is being fetched
  if (isAuthenticated && (usersLoading || ticketsLoading || projectsLoading)) {
    return (
      <div className="w-screen">
        <Loading />
      </div>
    )
  }

  const handleAuthFormSwitch = (formType) => {
    setIsLoginForm(formType === 'login')
  }

  return (
    <div className="flex  h-full w-screen relative">
      <Modal isOpen={showAuthModal} onClose={() => {}}>
        {isLoginForm ? (
          <LoginForm
            onFormTypeChange={() => handleAuthFormSwitch('signup')}
            onClose={() => setShowAuthModal(false)}
          />
        ) : (
          <SignupForm
            onFormTypeChange={() => handleAuthFormSwitch('login')}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </Modal>
      <Nav />
      <div className="flex-grow flex flex-col overflow-y-auto bg-chill-light-orange h-full">
        <CustomHeader />
        {children}
      </div>
    </div>
  )
}

export default WorkspaceLayout
