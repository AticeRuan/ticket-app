import React from 'react'

const Avatar = ({ username, size = 'md' }) => {
  // Generate a consistent color hash for a username
  const getColorFromUsername = (name) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-red-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-teal-500',
    ]

    // Create a simple hash from username
    const hash = name.split('').reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc)
    }, 0)

    // Use the hash to select a color
    return colors[Math.abs(hash) % colors.length]
  }

  // Get size classes
  const sizeClasses = {
    sm: 'w-10 h-10 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-2xl',
  }

  // Get the first letter of the username, handle empty strings
  const firstLetter = username ? username.charAt(0).toUpperCase() : '?'

  // Get background color based on username
  const bgColorClass = getColorFromUsername(username)

  return (
    <div
      className={`${sizeClasses[size]} ${bgColorClass} rounded-full flex items-center justify-center text-white shadow-md `}
      title={username}
    >
      {firstLetter}
    </div>
  )
}

export default Avatar
