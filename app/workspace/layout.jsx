'use client'
import React, { useEffect } from 'react'
import CustomHeader from '../(components)/CustomHeader'
import Nav from '../(components)/Nav'
import { useAuthContext } from '../(context)/AuthContext'
import { useRouter } from 'next/navigation'
import { useTicketContext } from '../(context)/TicketContext'
import { useProjectContext } from '../(context)/ProjectContext'
import { useUserContext } from '../(context)/UserContext'

const WorkspaceLayout = ({ children }) => {
  const { user } = useAuthContext()
  const { fetchUsers } = useUserContext()
  const { fetchTickets } = useTicketContext()
  const { fetchProjects } = useProjectContext()
  const router = useRouter()
  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([fetchTickets(), fetchProjects(), fetchUsers()])
    }
    fetchData()
  }, [])

  return (
    <div className="flex  h-full w-screen relative">
      <Nav />
      <div className="flex-grow flex flex-col overflow-y-auto bg-chill-light-orange h-full">
        <CustomHeader />
        {children}
      </div>
    </div>
  )
}

export default WorkspaceLayout
