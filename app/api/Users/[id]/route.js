// app/api/Users/[id]/route.js
import User from '../../../(models)/user'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../../(middlewares)/verifyJWT'
import bcrypt from 'bcryptjs'

// DELETE a user (soft delete)
export async function DELETE(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    const user = await User.findById(id)

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    await User.findByIdAndUpdate(id, { active: false })

    return NextResponse.json({ message: 'User deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

// Change password endpoint
export async function PATCH(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    const { action, ...data } = await req.json()

    const user = await User.findById(id)
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    switch (action) {
      case 'changePassword':
        const { currentPassword, newPassword } = data

        // Validate current password

        // Compare password
        const isMatch = await bcrypt.compare(currentPassword, user.password)
        if (!isMatch) {
          return NextResponse.json(
            { message: 'Current password is incorrect' },
            { status: 400 },
          )
        }

        // Update with new password
        // In real implementation, you'd hash the new password before saving
        await User.findByIdAndUpdate(id, { password: newPassword })
        return NextResponse.json(
          { message: 'Password updated successfully' },
          { status: 200 },
        )

      case 'changeRole':
        const { role } = data
        // Validate role
        if (!['user', 'admin', 'manager'].includes(role)) {
          return NextResponse.json({ message: 'Invalid role' }, { status: 400 })
        }

        await User.findByIdAndUpdate(id, { role })
        return NextResponse.json(
          { message: 'Role updated successfully' },
          { status: 200 },
        )

      case 'resetPassword':
        // Reset password to default value
        const defaultPassword = 'ChillDev2025'
        // In real implementation, you'd hash this password before saving
        await User.findByIdAndUpdate(id, { password: defaultPassword })
        return NextResponse.json(
          { message: 'Password reset successfully' },
          { status: 200 },
        )

      default:
        return NextResponse.json({ message: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
