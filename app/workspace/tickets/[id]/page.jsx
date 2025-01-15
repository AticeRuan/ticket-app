'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useTicketContext } from '../../../(context)/TicketContext'
import { useAuthContext } from '../../../(context)/AuthContext'
import { useProjectContext } from '../../../(context)/ProjectContext'
import Modal from '../../../(components)/common/Modal'
import TicketForm from '../../../(components)/TicketForm'
import Card from '../../../(components)/common/Card'
import { icons } from '../../../(utils)/constants'
import Loading from '../../../(components)/common/Loading'
import PriorityDisplay from '../../../(components)/common/PriorityDisplay'
import StatusDisplay from '../../../(components)/common/StatusDisplay'
import { useUserContext } from '../../../(context)/UserContext'

const SingleTicketPage = ({ params }) => {
  const { tickets, updateTicket, loading: ticketLoading } = useTicketContext()
  const { projects } = useProjectContext()
  const { user } = useAuthContext()
  const { users } = useUserContext()
  const [ticket, setTicket] = useState(null)
  const [project, setProject] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isClaimModalOpen, setIsClaimModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()
  const [ownerName, setOwnerName] = useState('Unassigned')

  useEffect(() => {
    if (!ticket) return

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
  }, [ticket, users])

  useEffect(() => {
    const fetchTicketAndProject = async () => {
      try {
        const foundTicket = tickets.find((t) => t._id === params.id)
        if (foundTicket) {
          setTicket(foundTicket)
          if (foundTicket.project) {
            const foundProject = projects.find(
              (p) => p._id === foundTicket.project,
            )
            setProject(foundProject)
          }
        } else {
          setError('Ticket not found')
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (tickets.length > 0 && projects.length > 0) {
      fetchTicketAndProject()
    }
  }, [params.id, tickets, projects])

  const handleUpdateTicket = async (formData) => {
    try {
      await updateTicket(ticket._id, formData)
      setTicket({ ...ticket, ...formData })
      setIsEditModalOpen(false)
    } catch (err) {
      console.error('Error updating ticket:', err)
      setError('Failed to update ticket')
    }
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

      if (typeof fetchTickets === 'function') {
        await fetchTickets()
      }
    } catch (err) {
      console.error('Error claiming ticket:', err)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const canEdit =
    user &&
    (ticket?.owner?.id === user.userId ||
      ticket?.status === 'Open' ||
      user.role === 'admin')
  const canClaim = user && ticket?.status === 'Open' && !ticket?.owner

  if (loading) return <Loading />
  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )
  if (!ticket)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Ticket not found</div>
      </div>
    )

  return (
    <div className="p-4 md:p-6">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-chill-orange transition-colors group active:scale-95"
        >
          <span className="w-8 h-8 p-1 flex items-center justify-center rounded-full group-hover:bg-chill-orange/10">
            {icons.BackIcon({ color: 'currentColor' })}
          </span>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>

      {/* Main Card */}
      <Card className="mb-8">
        <div className="space-y-6">
          {/* Header Section */}
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl md:text-3xl font-bold text-gray-800 capitalize break-words">
                  {ticket.title}
                </h1>
              </div>
              <StatusDisplay status={ticket.status} />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {canClaim && (
                <button
                  onClick={() => setIsClaimModalOpen(true)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-500 text-white rounded-md hover:opacity-90 transition-colors active:scale-95"
                >
                  Claim Ticket
                </button>
              )}
              {canEdit && (
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex-1 sm:flex-none px-4 py-2 bg-chill-orange text-white rounded-md hover:opacity-90 transition-colors active:scale-95"
                >
                  Edit Ticket
                </button>
              )}
            </div>
          </div>

          {/* Project Link */}
          {project && (
            <Link
              href={`/workspace/projects/${project._id}`}
              className="inline-flex items-center gap-2 text-chill-orange hover:opacity-80"
            >
              <span className="w-4 h-4">
                {icons.ProjectIcon({ color: 'currentColor' })}
              </span>
              <span className="font-medium">{project.name}</span>
            </Link>
          )}

          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-gray-600 whitespace-pre-wrap break-words">
              {ticket.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-1">
              <span className="text-gray-500 text-sm">Category</span>
              <span className="block font-medium capitalize">
                {ticket.category}
              </span>
            </div>

            <div className="space-y-1">
              <span className="text-gray-500 text-sm">Priority</span>
              <div className="mt-1">
                <PriorityDisplay priority={ticket.priority} />
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-gray-500 text-sm">Owner</span>
              <span className="block font-medium">{ownerName}</span>
            </div>
          </div>

          {/* Timestamps */}
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="block text-gray-500">Created:</span>
                <span className="block">{formatDate(ticket.createdAt)}</span>
              </div>
              <div className="space-y-1">
                <span className="block text-gray-500">Last Updated:</span>
                <span className="block">{formatDate(ticket.updatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Modals */}
      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <TicketForm
          ticket={ticket}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateTicket}
        />
      </Modal>

      <Modal
        isOpen={isClaimModalOpen}
        onClose={() => setIsClaimModalOpen(false)}
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold mb-4">Confirm Claim</h3>
          <p className="mb-6">Are you sure you want to claim this ticket?</p>
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              onClick={() => setIsClaimModalOpen(false)}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleClaimTicket}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SingleTicketPage
