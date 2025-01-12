// app/api/Users/route.js
import User from '../../(models)/user'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../(middlewares)/verifyJWT'

const signupSecretKey = process.env.SIGNUP_SECRET_KEY

// GET all users
export async function GET() {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const users = await User.find().select('-password') // Exclude password from response
    return NextResponse.json({ users }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}

// CREATE a new user
export async function POST(req) {
  try {
    const body = await req.json()
    const { secretKey, ...userData } = body.formData

    // Verify secret key
    if (secretKey !== signupSecretKey) {
      return NextResponse.json(
        { message: 'Invalid secret key' },
        { status: 401 },
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 },
      )
    }

    // Create new user
    const newUser = await User.create(userData)

    // Remove password from response
    const userResponse = newUser.toObject()
    delete userResponse.password

    return NextResponse.json(
      { message: 'User created', user: userResponse },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
