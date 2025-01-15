import React from 'react'
import { icons } from '../../(utils)/constants'

const PriorityDisplay = ({ priority }) => {
  // Function to get modern active color
  const getActiveColor = () => {
    switch (priority) {
      case 1:
        return '#9db814'
      case 2:
        return '#b8b314'
      case 3:
        return '#facc15'
      case 4:
        return '#ec964b'
      case 5:
        return '#ef4444'
      default:
        return '#94a3b8' // Gray for inactive
    }
  }

  return (
    <div className="flex justify-start align-baseline ">
      <span className="w-5 h-5">
        {icons.FireIcon({ color: priority > 0 ? getActiveColor() : '#94a3b8' })}
      </span>
      <span className="w-5 h-5">
        {icons.FireIcon({ color: priority > 1 ? getActiveColor() : '#94a3b8' })}
      </span>
      <span className="w-5 h-5">
        {icons.FireIcon({ color: priority > 2 ? getActiveColor() : '#94a3b8' })}
      </span>
      <span className="w-5 h-5">
        {icons.FireIcon({ color: priority > 3 ? getActiveColor() : '#94a3b8' })}
      </span>
      <span className="w-5 h-5">
        {icons.FireIcon({ color: priority > 4 ? getActiveColor() : '#94a3b8' })}
      </span>
    </div>
  )
}

export default PriorityDisplay
