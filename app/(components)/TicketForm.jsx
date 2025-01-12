import React, { useEffect, useState } from 'react'
import { useTicketContext } from '../(context)/TicketContext'
import { useProjectContext } from '../(context)/ProjectContext'
import { category } from '../utils/constants'

const TicketForm = ({ ticket = {}, onClose }) => {
  const { loading, error, createTicket, updateTicket } = useTicketContext()
  const { projects, loading: loadingProject } = useProjectContext()

  const EDITMODE = ticket?._id && ticket._id !== 'new'

  const startingTicketData = {
    title: '',
    description: '',
    priority: '1',
    progress: '0',
    status: 'not started',
    project: '',
    category: category[0].name,
    ...ticket,
  }

  const [formData, setFormData] = useState(startingTicketData)

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (EDITMODE) {
        await updateTicket(ticket._id, formData)
      } else {
        await createTicket(formData)
      }
      onClose()
    } catch (err) {
      console.error('Error submitting ticket:', err)
    }
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>
  }
  if (loading || loadingProject) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-bold mb-4">
        {EDITMODE ? 'Edit Ticket' : 'Create New Ticket'}
      </h3>
      <form
        className="flex flex-col gap-4"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="border rounded-md p-2"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            {category.map((cat) => (
              <option value={cat.name} key={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Project</label>
          <select
            id="project"
            name="project"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            {projects.map((project) => (
              <option value={project._id} key={project._id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Priority</label>
          <div className="flex gap-4">
            {[1, 2, 3, 4, 5].map((num) => (
              <div key={num} className="flex items-center gap-1">
                <input
                  id={`priority-${num}`}
                  name="priority"
                  type="radio"
                  value={num}
                  checked={Number(formData.priority) === num}
                  onChange={handleChange}
                />
                <label htmlFor={`priority-${num}`}>{num}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Progress</label>
          <input
            type="range"
            id="progress"
            name="progress"
            min="0"
            max="100"
            value={formData.progress}
            onChange={handleChange}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            <option value="not started">Not Started</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading
              ? 'Saving...'
              : EDITMODE
              ? 'Update Ticket'
              : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TicketForm
