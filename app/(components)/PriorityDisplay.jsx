import { faFire } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { icons } from '../(utils)/constants'

const PriorityDisplay = ({ priority }) => {
  return (
    <div className="flex justify-start align-baseline">
      <span className="pr-1 w-5 h-5">
        {icons.FireIcon({ color: priority > 0 ? '#E65F2B' : '#94a3b8' })}
      </span>
      <span className="pr-1 w-5 h-5">
        {icons.FireIcon({ color: priority > 1 ? '#E65F2B' : '#94a3b8' })}
      </span>
      <span className="pr-1 w-5 h-5">
        {icons.FireIcon({ color: priority > 2 ? '#E65F2B' : '#94a3b8' })}
      </span>{' '}
      <span className="pr-1 w-5 h-5">
        {icons.FireIcon({ color: priority > 3 ? '#E65F2B' : '#94a3b8' })}
      </span>{' '}
      <span className="pr-1 w-5 h-5">
        {icons.FireIcon({ color: priority > 4 ? '#E65F2B' : '#94a3b8' })}
      </span>
    </div>
  )
}

export default PriorityDisplay
