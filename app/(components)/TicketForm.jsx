import React, { useEffect, useState } from 'react'
import { useTicketContext } from '../(context)/TicketContext'
import { useProjectContext } from '../(context)/ProjectContext'
import { category } from '../(utils)/constants'
import { useRouter } from 'next/navigation'

const TicketForm = ({ ticket = {}, onClose }) => {
  const { loading, error, createTicket, updateTicket } = useTicketContext()
  const router = useRouter()
  const { projects, loading: loadingProject } = useProjectContext()
  const [submitError, setSubmitError] = useState(null)

  const EDITMODE = ticket?._id && ticket._id !== 'new'

  const startingTicketData = {
    title: '',
    description: '',
    priority: '1',
    progress: '0',
    status: 'Open',
    project: null,
    category: category[0].name,
    owner: null,
    ...ticket,
  }

  const [formData, setFormData] = useState(startingTicketData)

  const handleChange = (e) => {
    const { value, name } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value || null }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)

    try {
      // Ensure all required fields are present
      if (!formData.title || !formData.description) {
        throw new Error('Title and description are required')
      }

      // Format data for submission
      const ticketData = {
        ...formData,
        priority: parseInt(formData.priority, 10),
        progress: parseInt(formData.progress, 10),
        project: formData.project || null,
      }

      if (EDITMODE) {
        await updateTicket(ticket._id, ticketData)
      } else {
        await createTicket(ticketData)
        router.push('/workspace/tickets')
      }
      onClose()
    } catch (err) {
      console.error('Error submitting ticket:', err)
      setSubmitError(err.message || 'Error submitting ticket')
    }
  }

  if (loading || loadingProject) {
    return <div className="p-4">Loading...</div>
  }

  return (
    <div className="p-6 bg-chill-light-orange/50 rounded-xl">
      <h3 className="text-xl font-bold mb-4">
        {EDITMODE ? 'Edit Ticket' : 'Create New Ticket'}
      </h3>
      {submitError && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {submitError}
        </div>
      )}
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
        {!EDITMODE && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Project</label>
            <select
              id="project"
              name="project"
              value={formData.project || null}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              {' '}
              <option value={null} className="">
                No Related Project
              </option>
              {projects.map((project) => (
                <option value={project._id} key={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>
        )}

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
          <label className="text-sm font-medium">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-md p-2"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
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
            className="px-4 py-2 bg-chill-orange/90 text-white rounded-md hover:bg-chill-orange disabled:bg-blue-300"
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
