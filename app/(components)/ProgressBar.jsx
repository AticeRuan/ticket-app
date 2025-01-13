import React from 'react'

const ProgressBar = ({ progress, className }) => {
  progress
  return (
    <div
      className={`w-full bg-progress-bar-bg rounded-full h-2.5 ${className}`}
    >
      <div
        className="bg-progress-bar-fill  h-2.5 rounded-full "
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}

export default ProgressBar
