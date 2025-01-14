'use client'
import React, { useEffect, useState } from 'react'
import { useProjectContext } from '../../(context)/ProjectContext'
import Modal from '../../(components)/common/Modal'
import ProjectForm from '../../(components)/ProjectFrom'
import CreateButton from '../../(components)/common/CreateButton'
import { useRouter } from 'next/navigation'
import Card from '../../(components)/common/Card'

const ProjectPage = () => {
  const { projects, loading, error, fetchProjects, createProject } =
    useProjectContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchProjects()
  }, [])

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chill-orange"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full p-4">
        <div className="text-red-500">Error loading projects: {error}</div>
      </Card>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-800">Projects Overview</h1>
        <CreateButton
          onClick={() => setIsModalOpen(true)}
          text="New Project"
          className="bg-chill-orange text-white"
          collapse={true}
        />
      </div>

      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-chill-light-orange">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Project Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Budget
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    router.push(`/workspace/projects/${project._id}`)
                  }
                >
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {project.name}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                        project.status,
                      )}`}
                    >
                      {project.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(project.startDate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {formatDate(project.dueDate)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
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
        <Card className="w-full p-8">
          <div className="text-center text-gray-600">
            No projects found. Create a new project to get started.
          </div>
        </Card>
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
