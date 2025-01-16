'use client'
import React from 'react'
import { icons } from '../../(utils)/constants'
import { useRouter } from 'next/navigation'
const ErrorDisplay = ({ messages = [], className = '' }) => {
  const router = useRouter()
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 bg-chill-light-orange/50 rounded-xl ${className} `}
    >
      {messages.map((message, index) => (
        <p key={index} className="text-lg text-chill-black mb-6 text-center">
          {message}
        </p>
      ))}

      <button
        onClick={() => router.refresh()}
        className="flex items-center gap-2 px-6 py-3 bg-chill-orange text-white rounded-full hover:opacity-90 transition-all duration-300 shadow-sm active:scale-95"
      >
        <span className="w-5 h-5">
          {icons.RefreshIcon({ color: '#ffffff' })}
        </span>
        <span className="">Refresh Page</span>
      </button>
    </div>
  )
}

export default ErrorDisplay
