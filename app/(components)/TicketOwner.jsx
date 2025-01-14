import React from 'react'
import Avatar from './common/Avatar'

const TicketOwner = ({ owner = null }) => {
  return (
    <div className="flex items-center gap-2 py-2">
      <Avatar username={owner?.name || '?'} size="sm" />
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">
          {owner ? 'Assigned to' : 'Unassigned'}
        </span>
        <span className="text-xs text-gray-500">
          {owner?.name || 'No owner'}
        </span>
      </div>
    </div>
  )
}

export default TicketOwner
