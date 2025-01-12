'use client'
import { useEffect, useState } from 'react'
import { useProjectContext } from '../(context)/ProjectContext'
import Modal from '../(components)/common/Modal'
import ProjectForm from '../(components)/ProjectFrom'

const ProjectPage = () => {
  const { projects, loading, error, fetchProjects, createProject } =
    useProjectContext()

  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreateProject = async (formData) => {
    await createProject(formData)
    await fetchProjects()
    setIsModalOpen(false)
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!projects) return <div>No projects found</div>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Project
        </button>
      </div>

      {/* Project list rendering would go here */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project._id}
            className="p-4 border rounded-lg shadow hover:shadow-md"
          >
            <h3 className="text-lg font-semibold">{project.name}</h3>
            <p className="text-gray-600">{project.description}</p>
            {/* Add more project details as needed */}
          </div>
        ))}
      </div>

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
