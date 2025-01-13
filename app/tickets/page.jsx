'use client'
import React, { useEffect, useState } from 'react'
import TicketCard from '../(components)/TicketCard'
import { useTicketContext } from '../(context)/TicketContext'
import TicketForm from '../(components)/TicketForm'
import Modal from '../(components)/common/Modal'
import CreateButton from '../(components)/common/CreateButton'
import { icons } from '../(utils)/constants'

const TicketPage = () => {
  const { tickets, loading, error, fetchTickets } = useTicketContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchTickets()
  }, [])

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  const handleCreateTicket = () => {
    setSelectedTicket(null)
    setIsModalOpen(true)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Loading tickets...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  }

  const uniqueCategories = [
    'all',
    ...new Set(tickets?.map(({ category }) => category)),
  ]
  const uniqueStatuses = [
    'all',
    ...new Set(tickets?.map(({ status }) => status)),
  ]

  const filteredTickets = tickets?.filter((ticket) => {
    const matchesCategory =
      selectedCategory === 'all' || ticket.category === selectedCategory
    const matchesStatus =
      selectedStatus === 'all' ||
      ticket.status.toLowerCase() === selectedStatus.toLowerCase()
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesStatus && matchesSearch
  })

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chill-orange focus:border-transparent"
            />
            <span className="absolute left-3 top-2.5 w-4 h-4 text-gray-400">
              {icons.FindIcon({ color: '#9ca3af' })}
            </span>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chill-orange focus:border-transparent"
          >
            {uniqueCategories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chill-orange focus:border-transparent"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      {filteredTickets?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <span className="w-16 h-16 mb-4">
            {icons.TaskIcon({ color: '#9ca3af' })}
          </span>
          <p className="text-lg">No tickets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTickets.map((ticket) => (
            <TicketCard
              key={ticket._id}
              ticket={ticket}
              onEdit={handleEditTicket}
            />
          ))}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TicketForm ticket={selectedTicket} onClose={handleCloseModal} />
      </Modal>
    </div>
  )
}

export default TicketPage
