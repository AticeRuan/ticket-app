import React from 'react'
import { icons } from '../../(utils)/constants'

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gradient-radial from-chill-light-orange to-white rounded-2xl w-fit max-w-2xl mx-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  )
}

export default Modal
