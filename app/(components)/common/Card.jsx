import React from 'react'

const Card = ({ className, children }) => {
  return (
    <div
      className={`bg-white/30 rounded-[14px] ${className} p-[18px] flex flex-col shadow-sm`}
    >
      {children}
    </div>
  )
}

export default Card
