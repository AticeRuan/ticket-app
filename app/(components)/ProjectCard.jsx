import React from 'react'
import Card from './common/Card'
import ProgressBar from './ProgressBar'
import StatusDisplay from './common/StatusDisplay'

const ProjectCard = ({ project, onEdit }) => {
  // Format dates for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  // Calculate project progress based on tickets or dates
  const calculateProgress = () => {
    if (!project.dueDate) return 0

    const start = new Date(project.startDate).getTime()
    const end = new Date(project.dueDate).getTime()
    const now = new Date().getTime()

    const progress = ((now - start) / (end - start)) * 100
    return Math.min(Math.max(progress, 0), 100)
  }

  return (
    <Card
      className="hover:bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
      onClick={() => onEdit(project)}
    >
      <div className="p-4">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-gray-800 truncate">
            {project.name}
          </h3>
          <StatusDisplay status={project.status} />
        </div>

        {/* Description Section */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Project Details */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500">Start Date</p>
            <p className="font-medium">{formatDate(project.startDate)}</p>
          </div>
          <div>
            <p className="text-gray-500">Due Date</p>
            <p className="font-medium">
              {project.dueDate ? formatDate(project.dueDate) : 'Not set'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">Progress</span>
            <span className="font-medium">
              {Math.round(calculateProgress())}%
            </span>
          </div>
          <ProgressBar progress={calculateProgress()} className="h-2" />
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-chill-orange/10 text-chill-orange rounded-full">
              Priority {project.priority}
            </span>
            {project.tags && project.tags.length > 0 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                {project.tags[0]}
              </span>
            )}
          </div>
          <div className="text-gray-500">
            Budget: ${project.budget?.toLocaleString() || '0'}
          </div>
        </div>
      </div>
    </Card>
  )
}

export default ProjectCard
