'use client'
import React, { useEffect, useState } from 'react'
import { useProjectContext } from '../../(context)/ProjectContext'
import { useTicketContext } from '../../(context)/TicketContext'
import Modal from '../../(components)/common/Modal'
import ProjectForm from '../../(components)/ProjectFrom'
import TicketCard from '../../(components)/TicketCard'
import Card from '../../(components)/common/Card'
import { icons } from '../../(utils)/constants'
import { useRouter } from 'next/navigation'
import Loading from '../../(components)/common/Loading'

const SingleProjectPage = ({ params }) => {
  const { getProjectById } = useProjectContext()
  const { tickets } = useTicketContext()
  const [project, setProject] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(params.id)
        setProject(data.project)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [params.id])

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const getStatusColor = (status) => {
    const colors = {
      'Not Started': 'bg-red-100 text-red-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      Completed: 'bg-green-100 text-green-800',
      Cancelled: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) return <Loading />

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-red-600">Error: {error}</div>
      </div>
    )

  if (!project)
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-lg text-gray-600">Project not found</div>
      </div>
    )

  const projectTickets = tickets.filter(
    (ticket) => ticket.project === project._id,
  )

  return (
    <div className="p-6">
      <div className="mb-4">
        <button
          onClick={() => router.push('/project')}
          className="flex items-center gap-2 text-gray-600 hover:text-chill-orange transition-colors group active:scale-95"
        >
          <span className="w-8 h-8 p-1 flex items-center justify-center rounded-full group-hover:bg-chill-orange/10 transition-colors">
            {icons.BackIcon({ color: 'currentColor' })}
          </span>
          <span className="text-sm font-medium">Back to Projects</span>
        </button>
      </div>
      <Card className="mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-800">
                {project.name}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 max-w-3xl">{project.description}</p>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="px-4 py-2 bg-chill-orange text-white rounded-md hover:bg-opacity-90 transition-colors"
          >
            Edit Project
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Start Date</span>
            <span className="font-medium">{formatDate(project.startDate)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Due Date</span>
            <span className="font-medium">{formatDate(project.dueDate)}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Priority</span>
            <span className="font-medium">Level {project.priority}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 text-sm">Budget</span>
            <span className="font-medium">
              ${project.budget?.toLocaleString() || '0'}
            </span>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Project Tickets
        </h2>
        {projectTickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {projectTickets.map((ticket) => (
              <TicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <Card>
            <p className="text-gray-600 text-center py-8">
              No tickets associated with this project yet.
            </p>
          </Card>
        )}
      </div>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ProjectForm
          project={project}
          onClose={() => setIsEditModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default SingleProjectPage
