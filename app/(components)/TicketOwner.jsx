import React from 'react'
import Avatar from './common/Avatar'

const TicketOwner = ({ owner = null }) => {
  const isAssigned = owner !== 'Unassigned'
  return (
    <div className="flex items-center gap-2 py-2">
      {isAssigned && (
        <Avatar username={owner !== 'Unassigned' ? owner : '?'} size="sm" />
      )}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-700">
          {owner !== 'Unassigned' ? 'Assigned to' : 'Unassigned'}
        </span>
        {isAssigned && (
          <span className="text-xs text-gray-500">{owner || 'No owner'}</span>
        )}
      </div>
    </div>
  )
}

export default TicketOwner
