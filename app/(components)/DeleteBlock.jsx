'use client'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { useTicketContext } from '../(context)/TicketContext'

const DeleteBlock = ({ id }) => {
  const { loading, error, deleteTicket } = useTicketContext()

  if (error) {
    return <div>Error: {error}</div>
  }

  const handleDelete = async () => {
    if (!loading) {
      try {
        await deleteTicket(id)
      } catch (err) {
        console.error('Error deleting ticket:', err)
      }
    }
  }

  return (
    <FontAwesomeIcon
      icon={faX}
      className="text-red-400 hover:cursor-pointer hover:text-red-200"
      onClick={handleDelete}
    />
  )
}

export default DeleteBlock
