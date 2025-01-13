import React from 'react'

const LogoIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
    >
      <defs>
        <radialGradient id="bgGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: '#1a1a1a' }} />
          <stop offset="100%" style={{ stopColor: '#060606' }} />
        </radialGradient>
      </defs>

      <circle cx="50" cy="50" r="45" fill="#E65F2B" />

      <path
        d="M30 30
             H70
             V38
             H55
             V70
             H45
             V38
             H30
             Z"
        fill="#060606"
        strokeWidth="2"
      />
    </svg>
  )
}

export default LogoIcon
