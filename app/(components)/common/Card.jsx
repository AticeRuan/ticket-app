import React from 'react'

const Card = ({ className, children, onClick }) => {
  return (
    <div
      className={`bg-white/60 rounded-[14px] ${className} p-[18px] flex flex-col shadow-sm  rounded-xl transition-all duration-300
bg-white/70 backdrop-blur-lg border  border-white/90`}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Card
