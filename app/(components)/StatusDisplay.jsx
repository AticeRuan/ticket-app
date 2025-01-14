import React from 'react'

const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    let color = 'bg-slate-700'
    switch (status) {
      case 'Resolved':
      case 'Completed':
        color = 'bg-green-200 text-green-700'
        break
      case 'Open':
      case 'Not Started':
        color = 'bg-red-200 text-red-700'
        break
      case 'In Progress':
        color = 'bg-chill-orange/50 text-chill-orange'
        break
      case 'Closed':
        color = 'bg-blue-200 text-blue-700'
        break
      case 'On Hold':
        color = 'bg-yellow-200 text-yellow-700'
        break
      case 'Cancelled':
        color = 'bg-gray-200 text-gray-700'
        break
      default:
        break
    }
    return color
  }

  return (
    <span
      className={`inline-block rounded-full capitalize px-2 py-1 text-xs font-semibold text-gray-700 ${getColor(
        status,
      )}`}
    >
      {status}
    </span>
  )
}

export default StatusDisplay
