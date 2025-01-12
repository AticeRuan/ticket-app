import Ticket from '../../(models)/ticket'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../(middlewares)/verifyJWT'
export async function POST(req) {
  const authResponse = await verifyJWT(request)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const body = await req.json()
    const ticketData = body.formData
    await Ticket.create(ticketData)

    return NextResponse.json({ message: 'Ticket created' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

export async function GET(request) {
  const authResponse = await verifyJWT(request)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const tickets = await Ticket.find()

    return NextResponse.json({ tickets }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}
