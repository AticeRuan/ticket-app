'use client'
import React, { useEffect, useState } from 'react'
import { useUserContext } from '../(context)/UserContext'

import Card from '../(components)/common/Card'
import { icons } from '../(utils)/constants'

const UserManagementPage = () => {
  const { users, fetchUsers, resetPassword, changeUserRole, loading, error } =
    useUserContext()
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    isError: false,
  })

  //   useEffect(() => {
  //     fetchUsers()
  //   }, [fetchUsers]) //

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-chill-orange"></div>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full p-4">
        <div className="text-red-500 flex items-center gap-2">
          <span className="w-5 h-5">
            {icons.DeleteIcon && icons.DeleteIcon({ color: '#EF4444' })}
          </span>
          <span>Error loading users: {error}</span>
        </div>
      </Card>
    )
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

      <Card className="w-full overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-chill-light-orange">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users?.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
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
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => handleResetPassword(user._id)}
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                      >
                        Reset Password
                      </button>
                      <button
                        onClick={() => handleRoleChange(user._id, user.role)}
                        className="flex items-center gap-1 text-chill-orange hover:text-orange-700 text-sm font-medium transition-colors"
                      >
                        Change Role
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default UserManagementPage
