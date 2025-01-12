'use client'
import { useEffect, useState } from 'react'
import TicketCard from './TicketCard'
import { useTicketContext } from '../(context)/TicketContext'
import TicketForm from './TicketForm'
import Modal from './common/Modal'
import { useUserContext } from '../(context)/UserContext'
import { useRouter } from 'next/navigation'

const DashboardContent = () => {
  const { tickets, loading, error, fetchTickets } = useTicketContext()

  const { isAuthenticated } = useUserContext()

  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, router])

  return <div>dashboard</div>
}

export default DashboardContent
