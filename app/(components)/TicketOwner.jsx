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
        <span
          className={`${
            isAssigned
              ? 'text-xs  text-chill-black/70'
              : 'text-sm  text-chill-black/80'
          }`}
        >
          {isAssigned ? 'Assigned to' : 'Unassigned'}
        </span>
        {isAssigned && (
          <span className="text-sm text-chill-black/80">
            {owner || 'No owner'}
          </span>
        )}
      </div>
    </div>
  )
}

export default TicketOwner
