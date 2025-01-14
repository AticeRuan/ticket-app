import React, { useState } from 'react'

const ProjectForm = ({ project = {}, onSubmit, onClose }) => {
  const EDITMODE = project?._id !== undefined
  const formatDateForInput = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toISOString().split('T')[0]
  }
  const startingProjectData = {
    name: '',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    status: 'Not Started',
    priority: 3,
    budget: 0,
  }

  const [formData, setFormData] = useState({
    ...startingProjectData,
    ...project,
    startDate: project.startDate
      ? formatDateForInput(project.startDate)
      : startingProjectData.startDate,
    dueDate: project.dueDate ? formatDateForInput(project.dueDate) : '',
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(formData)
      onClose()
    } catch (err) {
      setError(err.message || 'Something went wrong')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-chill-light-orange/50 rounded-xl"
    >
      <h2 className="text-xl font-bold mb-4">
        {EDITMODE ? 'Edit Project' : 'Create New Project'}
      </h2>

      {error && <div>Error:{error}</div>}

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Project Name
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Description
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Start Date
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Due Date
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="On Hold">On Hold</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">
            Priority
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num} - {num === 1 ? 'Lowest' : num === 5 ? 'Highest' : ''}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Budget
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            min="0"
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {EDITMODE ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}

export default ProjectForm
