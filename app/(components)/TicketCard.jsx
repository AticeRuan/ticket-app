import React, { useState } from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import StatusDisplay from './StatusDisplay'
import Card from './common/Card'
import { icons } from '../(utils)/constants'
import { useRouter } from 'next/navigation'
import { useTicketContext } from '../(context)/TicketContext'
import { useAuthContext } from '../(context)/AuthContext'
import Modal from './common/Modal'
import TicketOwner from '../(components)/TicketOwner'

const TicketCard = ({ ticket }) => {
  const router = useRouter()
  const { updateTicket } = useTicketContext()
  const { user } = useAuthContext()

  console.log('user at ticket', user)
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  if (!ticket) return null //
  const getStatusColor = (status) => {
    if (!status) return '#ef4444' // Default color for undefined status

    const statusLower = status.toLowerCase()
    if (statusLower === 'closed') return '#3b82f6'
    if (statusLower === 'in progress') return '#f59e0b'
    if (statusLower === 'resolved') return '#22c55e'
    if (statusLower === 'not started') return '#ef4444'
    return '#ef4444' // Default color
  }
  const formatTimestamp = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(timestamp).toLocaleDateString('en-US', options)
  }

  const handleViewTicket = () => {
    router.push(`/workspace/tickets/${ticket._id}`)
  }

  const handleClaimTicket = async () => {
    try {
      // Construct update data maintaining all existing ticket fields
      const updatedTicketData = {
        ...ticket,
        status: 'In Progress',
        owner: user.userId,
      }

      console.log('updatedTicketData at frontend:', updatedTicketData)

      await updateTicket(ticket._id, updatedTicketData)
      setIsClaimModalOpen(false)

      // Fetch tickets to update the UI with the latest data
      if (typeof fetchTickets === 'function') {
        await fetchTickets()
      }
    } catch (err) {
      console.error('Error claiming ticket:', err)
    }
  }

  return (
    <>
      <Card className="flex flex-col bg-white hover:shadow-lg rounded-xl shadow-md transition-all duration-300 group ">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: getStatusColor(ticket.status),
              }}
            />
            <StatusDisplay status={ticket.status} />
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <DeleteBlock id={ticket._id} />
          </div>
        </div>

        <div className=" flex-1 flex flex-col justify-between">
          <h4 className="text-lg capitalize mb-5">{ticket.title}</h4>
          <p className="text-sm text-[#797979] line-clamp-2 mb-4 min-h-[40px]">
            {ticket.description}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5">
                {icons.ProjectIcon({ color: '#6b7280' })}
              </span>
              <span className="text-sm text-gray-600">{ticket.category}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Priority</span>
              </div>
              <div className="flex items-center gap-4">
                <PriorityDisplay priority={ticket.priority} />
              </div>
            </div>

            <TicketOwner owner={ticket.owner} />
          </div>

          <div className="flex justify-center items-start flex-col text-xs text-gray-500">
            <span>Last Updated At</span>
            <span className="text-chill-black">
              {formatTimestamp(ticket.updatedAt)}
            </span>
          </div>

          <div className="mt-4 flex gap-2 ">
            <button
              onClick={handleViewTicket}
              className="flex-1 px-4 py-2 bg-chill-orange/90 text-white rounded-md hover:bg-opacity-90 hover:rounded-full transition-all duration-500 ease-in-out text-xs"
            >
              View
            </button>
            {ticket.status === 'Open' ? (
              !ticket.owner ? (
                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-md hover:rounded-full  hover:bg-opacity-90 transition-all duration-500 ease-in-out text-xs"
                >
                  Claim
                </button>
              ) : null
            ) : null}
          </div>
        </div>
      </Card>

      <Modal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Confirm Claim</h3>
          <p className="mb-6">Are you sure you want to claim this ticket?</p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsClaimModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleClaimTicket}
              className="px-4 py-2 bg-chill-orange/90 text-white rounded-md hover:bg-chill-orange "
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TicketCard
