import Ticket from '../../(models)/ticket'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../(middlewares)/verifyJWT'

export async function POST(request) {
  try {
    // First verify JWT
    const authResponse = await verifyJWT(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Parse the request body
    const body = await request.json()
    console.log('Received ticket data:', body) // Debug log

    if (!body.formData) {
      return NextResponse.json(
        { message: 'Missing formData in request body' },
        { status: 400 },
      )
    }

    const ticketData = body.formData

    // Validate required fields
    if (!ticketData.title || !ticketData.description) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 },
      )
    }

    // Create the ticket with explicit fields
    // Remove project field if it's empty or null
    const ticketToCreate = {
      title: ticketData.title,
      description: ticketData.description,
      category: ticketData.category,
      priority: ticketData.priority,
      status: ticketData.status || 'Open',
      project:
        ticketData.project && ticketData.project !== ''
          ? ticketData.project
          : null,
    }
    // Only add project field if it has a valid value
    if (ticketData.project && ticketData.project !== '') {
      ticketToCreate.project = ticketData.project
    }

    const newTicket = await Ticket.create(ticketToCreate)

    // Return the created ticket in the response
    return NextResponse.json(
      {
        message: 'Ticket created',
        ticket: newTicket,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating ticket:', error) // Detailed error logging
    return NextResponse.json(
      {
        message: 'Error creating ticket',
        error: error.message,
      },
      { status: 500 },
    )
  }
}

export async function GET(request) {
  try {
    const authResponse = await verifyJWT(request)
    if (authResponse.status === 401) {
      return authResponse
    }

    const tickets = await Ticket.find()
    return NextResponse.json({ tickets }, { status: 200 })
  } catch (err) {
    console.error('Error fetching tickets:', err)
    return NextResponse.json(
      {
        message: 'Error fetching tickets',
        error: err.message,
      },
      { status: 500 },
    )
  }
}
