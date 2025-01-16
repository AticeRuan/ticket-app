'use client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../(context)/UserContext'
import { useAuthContext } from '../(context)/AuthContext'
import Card from '../(components)/common/Card'
import { icons } from '../(utils)/constants'
import Modal from '../(components)/common/Modal'

const UserManagementPage = () => {
  const { users, resetPassword, changeUserRole, loading, error, deleteUser } =
    useUserContext()
  const { user } = useAuthContext()
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    isError: false,
  })
  const [isAdmin, setIsAdmin] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [userToDelete, setUserToDelete] = useState(null)
  const [showInactive, setShowInactive] = useState(false)

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  })

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <span className="w-4 h-4 rotate-90">
          {icons.BackIcon({ color: '#9ca3af' })}
        </span>
      )
    }
    return (
      <span
        className={`w-4 h-4 transform transition-transform  ${
          sortConfig.direction === 'ascending' ? 'rotate-90' : '-rotate-90'
        }`}
      >
        {icons.BackIcon({ color: '#E65F2B' })}
      </span>
    )
  }

  const [copyAlert, setCopyAlert] = useState({ show: false, email: '' })

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  useEffect(() => {
    if (user && user.role === 'admin') {
      setIsAdmin(true)
    }
  }, [user])

  const handleResetPassword = async (userId) => {
    try {
      await resetPassword(userId)
      setAlert({
        show: true,
        message: 'Password has been reset successfully',
        isError: false,
      })
    } catch (err) {
      setAlert({
        show: true,
        message: 'Failed to reset password',
        isError: true,
      })
    }
    setTimeout(
      () => setAlert({ show: false, message: '', isError: false }),
      3000,
    )
  }

  const handleRoleChange = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'team member' : 'admin'
    try {
      await changeUserRole(userId, newRole)
      await fetchUsers()
      setAlert({
        show: true,
        message: 'User role updated successfully',
        isError: false,
      })
    } catch (err) {
      setAlert({
        show: true,
        message: 'Failed to update user role',
        isError: true,
      })
    }
    setTimeout(
      () => setAlert({ show: false, message: '', isError: false }),
      3000,
    )
  }

  const openDeleteModal = (userToDelete) => {
    setUserToDelete(userToDelete)
    setDeleteModalOpen(true)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setUserToDelete(null)
  }

  const handleDeleteConfirm = async () => {
    try {
      await deleteUser(userToDelete._id)
      setAlert({
        show: true,
        message: 'User has been deactivated successfully',
        isError: false,
      })
      closeDeleteModal()
    } catch (err) {
      setAlert({
        show: true,
        message: 'Failed to deactivate user',
        isError: true,
      })
    }
  }

  const sortData = (data) => {
    if (!sortConfig.key) return data

    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1
      }
      return 0
    })
  }
  const handleCopyEmail = async (email) => {
    try {
      await navigator.clipboard.writeText(email)
      setCopyAlert({ show: true, email })
      setTimeout(() => setCopyAlert({ show: false, email: '' }), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const filteredUsers = sortData(
    users?.filter((user) => (showInactive ? true : user.active)) || [],
  )

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chill-orange"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">
        <ErrorDisplay messages={[error]} />
      </div>
    )
  }

  const getStatusColor = (active) => {
    return active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="p-6 space-y-6">
      {alert.show && (
        <Card
          className={`w-full p-4 ${
            alert.isError ? 'bg-red-50' : 'bg-green-50'
          }`}
        >
          <div
            className={`flex items-center gap-2 ${
              alert.isError ? 'text-red-500' : 'text-green-500'
            }`}
          >
            <span className="w-5 h-5">
              {alert.isError
                ? icons.DeleteIcon && icons.DeleteIcon({ color: '#EF4444' })
                : icons.CreateIcon && icons.CreateIcon({ color: '#10B981' })}
            </span>
            <span>{alert.message}</span>
          </div>
        </Card>
      )}

      <div className="flex justify-end mb-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showInactive}
            onChange={(e) => setShowInactive(e.target.checked)}
            className="form-checkbox h-4 w-4 text-chill-orange rounded"
          />
          <span className="text-sm text-gray-600">Show Inactive Users</span>
        </label>
      </div>

      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-chill-light-orange">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-chill-orange"
                  >
                    Name {getSortIcon('name')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('email')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-chill-orange"
                  >
                    Email {getSortIcon('email')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('role')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-chill-orange"
                  >
                    Role {getSortIcon('role')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('active')}
                    className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-chill-orange"
                  >
                    Status {getSortIcon('active')}
                  </button>
                </th>
                {isAdmin && (
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user._id} className="">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2 group">
                      {user.email}
                      <button
                        onClick={() => handleCopyEmail(user.email)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity rounded-full p-1 bg-gray-100  text-gray-600 text-xs border"
                        title="Copy email"
                      >
                        copy
                      </button>
                      {copyAlert.show && copyAlert.email === user.email && (
                        <span className="text-xs text-green-600">Copied!</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-chill-orange bg-opacity-20 text-chill-orange'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {user.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  {isAdmin && (
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-3">
                        {user.active && (
                          <>
                            <button
                              onClick={() => handleResetPassword(user._id)}
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                            >
                              Reset Password
                            </button>
                            <button
                              onClick={() =>
                                handleRoleChange(user._id, user.role)
                              }
                              className="flex items-center gap-1 text-chill-orange hover:text-orange-700 text-sm font-medium transition-colors"
                            >
                              Change Role
                            </button>
                            <button
                              onClick={() => openDeleteModal(user)}
                              className="flex items-center gap-1 text-red-800 hover:text-red-400 text-sm font-medium transition-colors"
                            >
                              Deactivate
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 text-red-600">
            Deactivate User
          </h2>
          <p className="text-gray-600 mb-4">
            Are you sure you want to deactivate user{' '}
            <span className="font-semibold">{userToDelete?.name}</span>? This
            will prevent them from accessing the system.
          </p>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={closeDeleteModal}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Deactivate User
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default UserManagementPage
