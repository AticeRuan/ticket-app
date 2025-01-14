'use client'
import React, { useEffect, useState, useMemo } from 'react'
import TicketCard from '../../(components)/TicketCard'
import { useTicketContext } from '../../(context)/TicketContext'
import TicketForm from '../../(components)/TicketForm'
import Modal from '../../(components)/common/Modal'
import { icons } from '../../(utils)/constants'
import Loading from '../../(components)/common/Loading'
import { useAuthContext } from '../../(context)/AuthContext'

const TicketPage = () => {
  const { tickets, loading, error } = useTicketContext()
  const { user } = useAuthContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All Categories')
  const [selectedStatus, setSelectedStatus] = useState('All Statuses')
  const [searchQuery, setSearchQuery] = useState('')
  const [showOnlyMyTickets, setShowOnlyMyTickets] = useState(false)

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  // Sort function for tickets
  const sortTickets = (a, b) => {
    // Status priority order
    const statusOrder = {
      Open: 0,
      'In Progress': 1,
      Resolved: 2,
      Closed: 3,
    }

    // First sort by status
    if (statusOrder[a.status] !== statusOrder[b.status]) {
      return statusOrder[a.status] - statusOrder[b.status]
    }

    // Then sort by date (newest first)
    return new Date(b.createdAt) - new Date(a.createdAt)
  }

  const filteredAndSortedTickets = useMemo(() => {
    if (!tickets) return []

    return tickets
      .filter((ticket) => {
        if (!ticket) return false

        const matchesCategory =
          selectedCategory === 'All Categories' ||
          ticket.category === selectedCategory

        const matchesStatus =
          selectedStatus === 'All Statuses' || ticket.status === selectedStatus

        const matchesSearch =
          (ticket.title?.toLowerCase() || '').includes(
            searchQuery.toLowerCase(),
          ) ||
          (ticket.description?.toLowerCase() || '').includes(
            searchQuery.toLowerCase(),
          )

        const matchesOwner = showOnlyMyTickets
          ? ticket.owner?.id === user?.userId
          : true

        return matchesCategory && matchesStatus && matchesSearch && matchesOwner
      })
      .sort(sortTickets)
  }, [
    tickets,
    selectedCategory,
    selectedStatus,
    searchQuery,
    showOnlyMyTickets,
    user?.userId,
    sortTickets,
  ])

  // Get unique categories and statuses
  // Memoize unique categories
  const uniqueCategories = useMemo(() => {
    if (!tickets) return ['All Categories']
    const categories = tickets
      .map((ticket) => ticket?.category || '')
      .filter(Boolean) // Remove any null/undefined values
    return ['All Categories', ...new Set(categories)]
  }, [tickets])

  // Then in the render, add a safeguard for the string operations:
  const formatCategoryName = (category) => {
    if (!category) return ''
    return category.charAt(0).toUpperCase() + category.slice(1)
  }

  // Status options based on the ticket model
  const statusOptions = [
    'All Statuses',
    'Open',
    'In Progress',
    'Resolved',
    'Closed',
  ]

  if (loading) {
    return <Loading />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-wrap">
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
                {category === 'All Categories'
                  ? category
                  : formatCategoryName(category)}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-chill-orange focus:border-transparent"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showOnlyMyTickets}
              onChange={(e) => setShowOnlyMyTickets(e.target.checked)}
              className="form-checkbox h-4 w-4 text-chill-orange rounded border-gray-300 focus:ring-chill-orange"
            />
            <span className="text-sm text-gray-700">My Tickets</span>
          </label>
        </div>
      </div>

      {filteredAndSortedTickets?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <span className="w-16 h-16 mb-4">
            {icons.TaskIcon({ color: '#9ca3af' })}
          </span>
          <p className="text-lg">No tickets found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedTickets.map((ticket) => (
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
