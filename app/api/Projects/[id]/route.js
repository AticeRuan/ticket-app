// app/api/Projects/[id]/route.js
import Project from '@/app/(models)/project'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../../(middlewares)/verifyJWT'

// GET a single project with its tickets
export async function GET(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      )
    }

    // Get associated tickets
    const tickets = await mongoose.model('Ticket').find({ project: id })

    return NextResponse.json(
      {
        project,
        tickets,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

// UPDATE a project
export async function PUT(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params
    const body = await req.json()
    const projectData = body.formData

    // Convert string dates to Date objects
    if (projectData.startDate) {
      projectData.startDate = new Date(projectData.startDate)
    }
    if (projectData.dueDate) {
      projectData.dueDate = new Date(projectData.dueDate)
    }

    const updatedProject = await Project.findByIdAndUpdate(id, projectData, {
      new: true,
      runValidators: true,
    })

    if (!updatedProject) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(
      {
        message: 'Project updated',
        project: updatedProject,
      },
      { status: 200 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}

// DELETE a project
export async function DELETE(req, { params }) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const { id } = params

    // Find the project first
    const project = await Project.findById(id)

    if (!project) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      )
    }

    // Remove project reference from associated tickets
    await mongoose
      .model('Ticket')
      .updateMany({ project: id }, { $unset: { project: '' } })

    // Delete the project
    await Project.findByIdAndDelete(id)

    return NextResponse.json({ message: 'Project deleted' }, { status: 200 })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
