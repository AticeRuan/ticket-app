// app/api/auth/route.js
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../../(models)/user'

// Login route
export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      )
    }

    // Check if user is active
    if (!user.active) {
      return NextResponse.json(
        { message: 'Account is deactivated' },
        { status: 401 },
      )
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 },
      )
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
    )

    // Update last login
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
    })

    // Remove password from user object
    const userResponse = user.toObject()
    delete userResponse.password

    return NextResponse.json({
      message: 'Login successful',
      user: userResponse,
      token,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Login failed' }, { status: 500 })
  }
}
