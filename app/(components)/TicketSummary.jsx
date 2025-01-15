'use client'
import React from 'react'
import Card from './common/Card'
import StatusDisplay from './common/StatusDisplay'
import PriorityDisplay from './common/PriorityDisplay'
import { useRouter } from 'next/navigation'
const TicketSummary = ({ tickets, projects }) => {
  const router = useRouter()

  return (
    <Card className="p-6  shadow-md">
      <div className="flex justify-start items-center mb-4">
        <h3 className="text-lg  mb-4">Recent Tickets </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 px-6 ">Name</th>
              <th className="pb-3">Category</th>
              <th className="pb-3">Project</th>
              <th className="pb-3">Priority</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {tickets?.slice(0, 5).map((ticket, index) => (
              <tr key={index} className="hover:bg-chill-white ">
                <td
                  className="py-4 capitalize hover:cursor-pointer hover:underline  px-6 text-sm"
                  onClick={() => {
                    router.push(`/workspace/tickets/${ticket._id}`)
                  }}
                >
                  {ticket.title}
                </td>

                <td className="py-4 text-sm">{ticket.category}</td>
                <td
                  className="py-4 hover:cursor-pointer"
                  onClick={() =>
                    router.push(`/workspace/projects/${ticket.project}`)
                  }
                >
                  <span className="capitalize  hover:underline text-sm">
                    {
                      projects.find((project) => project._id === ticket.project)
                        ?.name
                    }
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
