import React from 'react'

const BackIcon = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.7657 4.22781C14.4533 3.92406 13.9467 3.92406 13.6343 4.22781L7.23431 10.45C7.08428 10.5959 7 10.7937 7 11C7 11.2063 7.08428 11.4041 7.23431 11.55L13.6343 17.7722C13.9467 18.0759 14.4533 18.0759 14.7657 17.7722C15.0781 17.4685 15.0781 16.976 14.7657 16.6723L8.93137 11L14.7657 5.32775C15.0781 5.02401 15.0781 4.53155 14.7657 4.22781Z"
        fill={color}
        className="transition-all duration-300"
      />
    </svg>
  )
}

export default BackIcon
