'use client'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from './common/Modal'
import { useTicketContext } from '../(context)/TicketContext'
import { useState } from 'react'
import Card from './common/Card'

const DeleteBlock = ({ id, user }) => {
  const { loading, error, deleteTicket } = useTicketContext()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const isAdmin = user?.role === 'admin'

  const handleDelete = async () => {
    if (!loading) {
      try {
        await deleteTicket(id)
      } catch (err) {
        console.error('Error deleting ticket:', err)
      }
    }
  }

  if (error) {
    return <div>Error: {error}</div>
  }
  return (
    isAdmin && (
      <>
        <button
          className=" mt-3 px-4 py-2 bg-gray-300 hover:bg-red-700 text-white rounded-md  hover:rounded-full hover:bg-opacity-90 transition-[border-radius] active:scale-95 duration-500 ease-in-out text-sm w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Card className="p-4">
            <h1 className="text-xl font-bold mb-4">Delete Ticket</h1>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this ticket?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-chill-orange/80  rounded-md hover:bg-chill-orange text-white active:scale-95 "
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 active:scale-95 "
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Card>
        </Modal>
      </>
    )
  )
}

export default DeleteBlock
