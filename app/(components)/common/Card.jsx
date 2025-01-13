import React from 'react'

const Card = ({ className, children, onClick }) => {
  return (
    <div
      className={`bg-white/30 rounded-[14px] ${className} p-[18px] flex flex-col shadow-sm`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
