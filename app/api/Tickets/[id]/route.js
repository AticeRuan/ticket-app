import Ticket from '../../../(models)/ticket'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../../(middlewares)/verifyJWT'
import mongoose from 'mongoose'
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

// Let's update the PUT route handler with debug logging
export async function PUT(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }

  try {
    const { id } = params
    const body = await req.json()
    const ticketData = body.formData

    // Convert string IDs to ObjectIds
    const updateData = {
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: ticketData.status,
      project: ticketData.project
        ? new mongoose.Types.ObjectId(ticketData.project)
        : null,
    }
    if (ticketData.owner) {
      updateData.owner = new mongoose.Types.ObjectId(ticketData.owner)
    }

    console.log('Update data being sent to MongoDB:', updateData)

    const currentTicket = await Ticket.findById(id)
    console.log('Current ticket state:', currentTicket)

    // Use updateOne instead of findByIdAndUpdate for more explicit control
    const result = await Ticket.updateOne({ _id: id }, { $set: updateData })

    console.log('MongoDB update result:', result)

    // Fetch the updated document
    const updatedTicket = await Ticket.findById(id)
    console.log('Updated ticket result:', updatedTicket)

    if (!updatedTicket) {
      return NextResponse.json({ message: 'Ticket not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: 'Ticket updated',
        ticket: updatedTicket,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Ticket update error:', error)
    return NextResponse.json(
      {
        message: 'Error updating ticket',
        error: error.message,
      },
      { status: 500 },
    )
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
