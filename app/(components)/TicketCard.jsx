import React from 'react'
import DeleteBlock from './DeleteBlock'
import PriorityDisplay from './PriorityDisplay'
import ProgressBar from './ProgressBar'
import StatusDisplay from './StatusDisplay'
import Card from './common/Card'
import { icons } from '../(utils)/constants'

const TicketCard = ({ ticket, onEdit }) => {
  const formatTimestamp = (timestamp) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }
    return new Date(timestamp).toLocaleDateString('en-US', options)
  }

  return (
    <Card className="flex flex-col bg-white hover:shadow-lg hover:translate-y-1 rounded-xl shadow-md transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor:
                ticket.status.toLowerCase() === 'completed'
                  ? '#22c55e'
                  : ticket.status.toLowerCase() === 'in progress'
                  ? '#eab308'
                  : '#ef4444',
            }}
          />
          <StatusDisplay status={ticket.status} />
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
          <DeleteBlock id={ticket._id} />
        </div>
      </div>

      <div onClick={() => onEdit(ticket)} className="cursor-pointer flex-1">
        <h4 className="text-lg capitalize mb-5">{ticket.title}</h4>
        <p className="text-sm text-[#797979;] line-clamp-2 mb-4 min-h-[40px]">
          {ticket.description}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-5 h-5">
              {icons.ProjectIcon({ color: '#6b7280' })}
            </span>
            <span className="text-sm text-gray-600">{ticket.category}</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Priority</span>
            </div>
            <div className="flex items-center gap-4">
              <PriorityDisplay priority={ticket.priority} />
            </div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Created</span>
            <span>{formatTimestamp(ticket.createdAt)}</span>
          </div>
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>Updated</span>
            <span>{formatTimestamp(ticket.updatedAt)}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default TicketCard
