import React from 'react'

const Loading = ({ message }) => {
  return (
    <div className="flex items-center justify-center h-screen max-w-screen w-fit flex-col gap-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chill-orange" />
      <p className="text-chill-black/80 ">{message}</p>
    </div>
  )
}

export default Loading
