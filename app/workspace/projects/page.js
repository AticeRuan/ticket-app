'use client'
import React, { useState } from 'react'
import { useProjectContext } from '../../(context)/ProjectContext'
import Modal from '../../(components)/common/Modal'
import ProjectForm from '../../(components)/ProjectFrom'
import CreateButton from '../../(components)/common/CreateButton'
import { useRouter } from 'next/navigation'
import Card from '../../(components)/common/Card'
import { icons } from '../../(utils)/constants'
import ErrorDisplay from '../../(components)/common/ErrorDisplay'

const ProjectPage = () => {
  const { projects, loading, error, fetchProjects, createProject } =
    useProjectContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const router = useRouter()

  const handleSort = (key) => {
    let direction = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const handleCreateProject = async (formData) => {
    await createProject(formData)
    await fetchProjects()
    setIsModalOpen(false)
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const getPriorityLabel = (priority) => {
    const labels = {
      1: 'Low',
      2: 'Medium-Low',
      3: 'Medium',
      4: 'Medium-High',
      5: 'High',
    }
    return labels[priority] || priority
  }

  const getSortedProjects = () => {
    if (!sortConfig.key) return projects

    return [...projects].sort((a, b) => {
      if (sortConfig.key === 'name') {
        return sortConfig.direction === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      }
      if (sortConfig.key === 'status') {
        return sortConfig.direction === 'asc'
          ? a.status.localeCompare(b.status)
          : b.status.localeCompare(a.status)
      }
      if (sortConfig.key === 'startDate') {
        const dateA = new Date(a.startDate || 0)
        const dateB = new Date(b.startDate || 0)
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA
      }
      if (sortConfig.key === 'dueDate') {
        const dateA = new Date(a.dueDate || 0)
        const dateB = new Date(b.dueDate || 0)
        return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA
      }
      if (sortConfig.key === 'priority') {
        return sortConfig.direction === 'asc'
          ? a.priority - b.priority
          : b.priority - a.priority
      }
      if (sortConfig.key === 'budget') {
        return sortConfig.direction === 'asc'
          ? (a.budget || 0) - (b.budget || 0)
          : (b.budget || 0) - (a.budget || 0)
      }
      return 0
    })
  }

  const SortableHeader = ({ label, sortKey }) => {
    const isActive = sortConfig.key === sortKey
    return (
      <th
        className="px-6 py-3 text-left text-sm  text-chill-black/80 cursor-pointer hover:bg-chill-light-orange transition-colors"
        onClick={() => handleSort(sortKey)}
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          {label}
          <div className="flex flex-col ">
            <span
              className={`w-3 h-3 transition-all ${
                isActive && sortConfig.direction === 'asc'
                  ? 'text-chill-orange'
                  : 'text-gray-400'
              }`}
              style={{ transform: 'rotate(90deg)' }}
            >
              {icons.BackIcon({ color: 'currentColor' })}
            </span>
            <span
              className={`w-3 h-3 transition-all ${
                isActive && sortConfig.direction === 'desc'
                  ? 'text-chill-orange'
                  : 'text-gray-400'
              }`}
              style={{ transform: 'rotate(-90deg)' }}
            >
              {icons.BackIcon({ color: 'currentColor' })}
            </span>
          </div>
        </div>
      </th>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chill-orange"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <ErrorDisplay messages={[error]} />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center relative group">
        <h1 className="text-2xl text-chill-black/80">Projects Overview</h1>
        <CreateButton
          onClick={() => setIsModalOpen(true)}
          text="New Project"
          className="bg-chill-orange text-white"
          collapse={true}
        />{' '}
        <span className="absolute px-2 py-1 rounded-lg border bg-chill-black/20 text-xs border-chill-black/80 backdrop-blur-md shadow-xl text-chill-black/80 top-[50px] right-[0px] hidden  group-hover:block z-30">
          New Project
        </span>
      </div>

      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-chill-light-orange">
              <tr>
                <SortableHeader label="Project Name" sortKey="name" />
                <SortableHeader label="Status" sortKey="status" />
                <SortableHeader label="Start Date" sortKey="startDate" />
                <SortableHeader label="Due Date" sortKey="dueDate" />
                <SortableHeader label="Priority" sortKey="priority" />
                <SortableHeader label="Budget" sortKey="budget" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {getSortedProjects().map((project) => (
                <tr
                  key={project._id}
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() =>
                    router.push(`/workspace/projects/${project._id}`)
                  }
                >
                  <td className="px-6 py-4 text-sm text-chill-black">
                    {project.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs 
                       ${getStatusColor(project.status)} whitespace-nowrap`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-chill-black/70 whitespace-nowrap">
                    {formatDate(project.startDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-chill-black/70 whitespace-nowrap">
                    {formatDate(project.dueDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs whitespace-nowrap
                      ${
                        project.priority >= 4
                          ? 'bg-red-100 text-red-800'
                          : project.priority === 3
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {getPriorityLabel(project.priority)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    ${project.budget?.toLocaleString() || '0'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {projects.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <span className="w-16 h-16 mb-4">
            {icons.ProjectIcon({ color: '#9ca3af' })}
          </span>
          <p className="text-lg">
            No projects found. Create a new project to get started.
          </p>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProjectForm
          onSubmit={handleCreateProject}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  )
}

export default ProjectPage
