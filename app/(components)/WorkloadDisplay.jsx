import React from 'react'
import Card from '../(components)/common/Card'

const WorkloadDisplay = ({ data }) => {
  // Maximum number of circles to display
  const MAX_CIRCLES = 4

  return (
    <Card className="p-6  shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg  mb-4">Tickets Workload</h3>
        <select className="border rounded-md p-1 text-sm">
          <option>Last 3 months</option>
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      <div className="flex justify-between items-end mt-8">
        {data.map((member) => (
          <div key={member.name} className="flex flex-col items-center gap-2">
            {/* Circles stack */}
            <div className="flex flex-col-reverse gap-1 relative">
              {[...Array(MAX_CIRCLES)].map((_, index) => {
                const isActive = index < member.workload
                return (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full border-2 ${
                      isActive
                        ? 'bg-chill-orange border-chill-orange'
                        : 'bg-white border-gray-200'
                    }`}
                  />
                )
              })}
              {/* Workload number */}
              {member.workload > 0 && (
                <div className="absolute bottom-0 left-1/2 -translate-x-[50%] bg-gray-900 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {member.workload.toString().padStart(2, '0')}
                </div>
              )}
            </div>
            {/* Name label */}
            <span className="text-sm text-gray-600 mt-2">{member.name}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default WorkloadDisplay
