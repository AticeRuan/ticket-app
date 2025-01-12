// app/middleware/auth.js
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export async function verifyJWT(request) {
  try {
    const authHeader = request.headers.get('Authorization')

    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { message: 'No token provided' },
        { status: 401 },
      )
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      request.user = decoded
      return NextResponse.next()
    } catch (err) {
      console.error('Token verification error:', err) // Debug log
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }
  } catch (error) {
    console.error('Authentication error:', error) // Debug log
    return NextResponse.json(
      { message: 'Authentication error' },
      { status: 401 },
    )
  }
}
