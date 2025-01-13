import React from 'react'

const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    let color = 'bg-slate-700'
    switch (status.toLowerCase()) {
      case 'completed':
        color = 'bg-green-200 text-green-700'
        return color

      case 'not started':
        color = 'bg-red-200 text-red-700 '
        return color
      case 'in progress':
        color = 'bg-chill-orange/50 text-chill-orange'
        return color
      default:
        color
    }
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
