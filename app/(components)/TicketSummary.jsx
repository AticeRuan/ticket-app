import React from 'react'
import Card from './common/Card'
import StatusDisplay from './StatusDisplay'
import PriorityDisplay from './PriorityDisplay'

const TicketSummary = ({ tickets }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <Card className="p-6  shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg  mb-4">Ticket summary</h3>
        <div className="flex space-x-4">
          <select className="border rounded px-3 py-1 text-sm">
            <option>Project</option>
          </select>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Ticket Owner</option>
          </select>
          <select className="border rounded px-3 py-1 text-sm">
            <option>Status</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Project</th>
              <th className="pb-3">Priority</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tickets?.slice(0, 5).map((ticket, index) => (
              <tr key={index} className="hover:bg-chill-white ">
                <td className="py-4 capitalize">{ticket.title}</td>
                {/* <td className="py-4">{ticket.owner || 'Unassigned'}</td> */}
                <td className="py-4">{ticket.category}</td>
                <td className="py-4">
                  <span className="capitalize ">
                    {ticket.project || 'none'}
                  </span>
                </td>
                <td className="py-4">
                  <PriorityDisplay priority={ticket.priority} />
                </td>
                <td className="py-4">
                  <div className="flex items-center">
                    <StatusDisplay status={ticket.status} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default TicketSummary
