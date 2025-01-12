'use client'
import { useEffect, useState } from 'react'
import TicketCard from './TicketCard'
import { useTicketContext } from '../(context)/TicketContext'
import TicketForm from './TicketForm'
import Modal from './common/Modal'

const DashboardContent = () => {
  const { tickets, loading, error, fetchTickets } = useTicketContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState(null)
  useEffect(() => {
    fetchTickets()
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!tickets) return <div>No tickets found</div>

  const uniqueCategories = [
    ...new Set(tickets?.map(({ category }) => category)),
  ]

  const handleEditTicket = (ticket) => {
    setSelectedTicket(ticket)
    setIsModalOpen(true)
  }

  const handleCreateTicket = () => {
    setSelectedTicket(null)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedTicket(null)
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tickets</h1>
        <button
          onClick={handleCreateTicket}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Ticket
        </button>
      </div>

      {uniqueCategories.map((uniqueCategory, categoryIndex) => (
        <div key={categoryIndex} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{uniqueCategory}</h2>
          <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-4">
            {tickets
              .filter((ticket) => ticket.category === uniqueCategory)
              .map((filteredTicket) => (
                <TicketCard
                  key={filteredTicket._id}
                  ticket={filteredTicket}
                  onEdit={() => handleEditTicket(filteredTicket)}
                />
              ))}
          </div>
        </div>
      ))}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TicketForm ticket={selectedTicket} onClose={handleCloseModal} />
      </Modal>
    </div>
  )
}

export default DashboardContent
