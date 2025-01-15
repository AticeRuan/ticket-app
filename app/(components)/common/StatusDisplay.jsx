import React from 'react'

const StatusDisplay = ({ status }) => {
  const getColor = (status) => {
    switch (status) {
      case 'Resolved':
      case 'Completed':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200'
      case 'Open':
      case 'Not Started':
        return 'bg-rose-50 text-rose-700 border border-rose-200'
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 border border-amber-200'
      case 'Closed':
        return 'bg-sky-50 text-sky-700 border border-sky-200'
      case 'On Hold':
        return 'bg-orange-50 text-orange-700 border border-orange-200'
      case 'Cancelled':
        return 'bg-slate-100 text-slate-700 border border-slate-200'
      default:
        return 'bg-slate-100 text-slate-700 border border-slate-200'
    }
  }

  return (
    <span
      className={`inline-block rounded-full capitalize px-2 py-1 text-xs w-fit whitespace-nowrap ${getColor(
        status,
      )}`}
    >
      {status}
    </span>
  )
}

export default StatusDisplay
