import React, { useEffect, useState } from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './common/PriorityDisplay'
import StatusDisplay from './common/StatusDisplay'
import Card from './common/Card'
import { icons } from '../(utils)/constants'
import { useRouter } from 'next/navigation'
import { useTicketContext } from '../(context)/TicketContext'
import { useAuthContext } from '../(context)/AuthContext'
import Modal from './common/Modal'
import TicketOwner from '../(components)/TicketOwner'
import { useUserContext } from '../(context)/UserContext'

const TicketCard = ({ ticket }) => {
  const router = useRouter()
  const { updateTicket } = useTicketContext()
  const { user } = useAuthContext()
  const { users } = useUserContext()
  const [ownerName, setOwnerName] = useState('Unassigned')
  const [isHovered, setIsHovered] = useState(false)
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)

  useEffect(() => {
    const fetchOwnerName = () => {
      if (!ticket.owner || !users?.length) {
        setOwnerName('Unassigned')
        return
      }

      const owner = users.find((user) => user._id === ticket.owner)
      if (owner?.name) {
        setOwnerName(owner.name)
      } else {
        setOwnerName('Unassigned')
      }
    }

    fetchOwnerName()
  }, [ticket.owner, users])

  if (!ticket) return null

  const getStatusColor = (status) => {
    if (!status) return '#ef4444'
    const statusLower = status.toLowerCase()
    if (statusLower === 'closed') return '#3b82f6'
    if (statusLower === 'in progress') return '#f59e0b'
    if (statusLower === 'resolved') return '#22c55e'
    if (statusLower === 'not started') return '#ef4444'
    return '#ef4444'
  }

  const formatTimestamp = (timestamp) => {
    const options = {
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
      const updatedTicketData = {
        ...ticket,
        status: 'In Progress',
        owner: user.userId,
      }

      await updateTicket(ticket._id, updatedTicketData)
      setIsClaimModalOpen(false)
    } catch (err) {
      console.error('Error claiming ticket:', err)
    }
  }

  return (
    <>
      <Card
        className="relative flex flex-col p-6 hover:shadow-xl"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between mb-4">
          <StatusDisplay status={ticket.status} />
          <div
            className={`transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <DeleteBlock id={ticket._id} user={user} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <h4 className="text-lg  text-chill-black capitalize line-clamp-1">
              {ticket.title}
            </h4>
            <p className="text-sm text-chill-black/80 line-clamp-2 min-h-[40px]">
              {ticket.description}
            </p>
          </div>

          {/* Category and Priority Section */}
          <div className="flex items-start justify-between py-2 flex-col sm:flex-row gap-2  ">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4">
                {icons.ProjectIcon({ color: '#6b7280' })}
              </span>
              <span className="text-sm text-chill-black/60">
                {ticket.category}
              </span>
            </div>
            <PriorityDisplay priority={ticket.priority} />
          </div>

          {/* Owner and Date Section */}
          <div className="flex items-center justify-between py-2 ">
            <TicketOwner owner={ownerName} />
            <div className="text-xs text-chill-black/60">
              {formatTimestamp(ticket.updatedAt)}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={handleViewTicket}
              className="flex-1 px-4 py-2 bg-chill-orange text-white rounded-md  hover:rounded-full hover:bg-chill-orange/90 transition-[border-radius] active:scale-95 duration-500 text-sm "
            >
              View Details
            </button>
            {ticket.status === 'Open' && !ticket.owner && (
              <button
                onClick={() => setIsClaimModalOpen(true)}
                className="flex-1 px-4 py-2 bg-blue-green-600 text-white rounded-md hover:shadow-lg hover:rounded-full transition-all duration-500 active:scale-95 bg-gradient-to-r from-blue-500 to-emerald-500  text-sm "
              >
                Claim Ticket
              </button>
            )}
          </div>
          <DeleteBlock id={ticket._id} user={user} />
        </div>
      </Card>

      {/* Claim Modal */}
      <Modal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      >
        <div className="p-6 bg-white rounded-xl">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Claim Ticket
          </h3>
          <p className="mb-6 text-gray-600">
            Are you sure you want to claim this ticket? You will be assigned as
            the owner.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsClaimModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-300"
            >
              Cancel
            </button>
            <button
              onClick={handleClaimTicket}
              className="px-4 py-2 bg-chill-orange text-white rounded-lg hover:bg-chill-orange/90 transition-colors duration-300"
            >
              Confirm Claim
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default TicketCard
