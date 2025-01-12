import Ticket from '../../../(models)/ticket'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../../(middlewares)/verifyJWT'

export async function GET(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    const foundTicket = await Ticket.findOne({ _id: id })
    return NextResponse.json({ foundTicket }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    const body = await req.json()
    const ticketData = body.formData
    const updateTicketData = await Ticket.findByIdAndUpdate(id, {
      ...ticketData,
    })
    return NextResponse.json({ message: 'Ticket updated' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    await Ticket.findByIdAndDelete(id)

    return NextResponse.json({ message: 'Ticket deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
