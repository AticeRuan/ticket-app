'use client'
import React, { useEffect, useState } from 'react'
import { useProjectContext } from '../../../(context)/ProjectContext'
import { useTicketContext } from '../../../(context)/TicketContext'
import Modal from '../../../(components)/common/Modal'
import ProjectForm from '../../../(components)/ProjectFrom'
import TicketCard from '../../../(components)/TicketCard'
import Card from '../../../(components)/common/Card'
import { icons } from '../../../(utils)/constants'
import { useRouter } from 'next/navigation'
import Loading from '../../../(components)/common/Loading'

const SingleProjectPage = ({ params }) => {
  const {
    getProjectById,
    updateProject,
    deleteProject,
    loading: isLoading,
  } = useProjectContext()
  const { tickets, fetchTickets } = useTicketContext()
  const [project, setProject] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
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

  const handleUpdateProject = async (formData) => {
    try {
      await updateProject(project._id, formData)
      setProject({ ...project, ...formData })
    } catch (err) {
      console.error(err)
    } finally {
      setIsEditModalOpen(false)
    }
  }

  const handleDeleteProject = async () => {
    if (deleteConfirmText !== project.name) return

    try {
      await deleteProject(project._id)
      await fetchTickets()
      router.push('/workspace/projects')
    } catch (err) {
      console.error('Error deleting project:', err)
      setError('Failed to delete project')
    }
  }

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false)
    setDeleteConfirmText('')
  }

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
    <div className="p-4 md:p-6">
      <div className="mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-chill-orange transition-colors group active:scale-95"
        >
          <span className="w-8 h-8 p-1 flex items-center justify-center rounded-full group-hover:bg-chill-orange/10 transition-colors">
            {icons.BackIcon({ color: 'currentColor' })}
          </span>
          <span className="text-sm font-medium">Back</span>
        </button>
      </div>
      <Card className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex md:items-center gap-4 mb-2 flex-col sm:flex-row ">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {project.name}
              </h1>
              <span
                className={`px-3 py-1 w-fit  rounded-full text-sm font-medium ${getStatusColor(
                  project.status,
                )}`}
              >
                {project.status}
              </span>
            </div>
            <p className="text-gray-600 max-w-3xl break-words">
              {project.description}
            </p>
          </div>

          <button
            onClick={() => setIsEditModalOpen(true)}
            className="mt-4 md:mt-0 px-4 py-2 bg-chill-orange text-white rounded-md hover:bg-opacity-90 transition-colors active:scale-95"
          >
            Edit Project
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
          Project Tickets
        </h2>
        {projectTickets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
      <button
        onClick={() => setIsDeleteModalOpen(true)}
        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full transition-colors"
      >
        Delete Project
      </button>

      <Modal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <ProjectForm
          project={project}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleUpdateProject}
        />
      </Modal>
      <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold text-red-600 mb-4">
            Delete Project
          </h2>
          <p className="text-gray-600 mb-4">
            This action cannot be undone. This will{' '}
            <b className="text-chill-orange">permanently</b> delete the project
            and all associated tickets.
          </p>
          <p className="mb-4">
            Please type <span className="font-semibold">{project.name}</span> to
            confirm.
          </p>
          <input
            type="text"
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-red-500"
            placeholder="Enter project name"
          />

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            {!isLoading && (
              <button
                onClick={handleCloseDeleteModal}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleDeleteProject}
              disabled={deleteConfirmText !== project.name || isLoading}
              className={`px-4 py-2 bg-red-600 text-white rounded-md $ {
                deleteConfirmText !== project.name
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:bg-red-700'
              }`}
            >
              {isLoading ? 'Deleting....' : 'Delete Project'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SingleProjectPage
