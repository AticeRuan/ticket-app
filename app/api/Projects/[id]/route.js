// app/api/Projects/[id]/route.js
import Project from '../../../(models)/project'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../../(middlewares)/verifyJWT'
import mongoose from 'mongoose'
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
  try {
    // Verify authentication
    const authResponse = await verifyJWT(req)
    if (authResponse.status === 401) {
      return authResponse
    }

    const { id } = params
    const body = await req.json()
    const projectData = body.formData

    // Verify the project exists
    const existingProject = await Project.findById(id)
    if (!existingProject) {
      return NextResponse.json(
        { message: 'Project not found' },
        { status: 404 },
      )
    }

    // Verify ownership if needed
    const userId = req.user.userId
    if (existingProject.owner.toString() !== userId) {
      return NextResponse.json(
        { message: 'Not authorized to update this project' },
        { status: 403 },
      )
    }

    // Convert string dates to Date objects
    if (projectData.startDate) {
      projectData.startDate = new Date(projectData.startDate)
    }
    if (projectData.dueDate) {
      projectData.dueDate = new Date(projectData.dueDate)
    }

    // Update the project
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $set: projectData },
      {
        new: true, // Return the updated document
        runValidators: true, // Run schema validators
      },
    )

    return NextResponse.json(
      {
        message: 'Project updated successfully',
        project: updatedProject,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error('Project update error:', error)
    return NextResponse.json(
      {
        message: 'Error updating project',
        error: error.message,
      },
      { status: 500 },
    )
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
