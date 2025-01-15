import React from 'react'

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen max-w-screen w-fit">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chill-orange"></div>
    </div>
  )
}

export default Loading
