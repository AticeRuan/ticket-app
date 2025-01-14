// app/api/Projects/route.js
import Project from '../../(models)/project'
import { NextResponse } from 'next/server'
import { verifyJWT } from '../(middlewares)/verifyJWT'

// GET all projects
export async function GET(req) {
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const projects = await Project.find()
    return NextResponse.json({ projects }, { status: 200 })
  } catch (err) {
    console.log(err)
    return NextResponse.json({ message: 'Error', err }, { status: 500 })
  }
}

// CREATE a new project
export async function POST(req) {
  try {
    const authResponse = await verifyJWT(req)
    if (authResponse.status === 401) {
      return authResponse
    }

    // Get user ID from JWT token
    const userId = req.user.userId // JWT verification adds user to request

    const body = await req.json()
    const projectData = body.formData

    // Add owner from JWT token
    projectData.owner = userId

    // Convert string dates to Date objects
    if (projectData.startDate) {
      projectData.startDate = new Date(projectData.startDate)
    }
    if (projectData.dueDate) {
      projectData.dueDate = new Date(projectData.dueDate)
    }

    // Remove any undefined or empty fields
    Object.keys(projectData).forEach((key) => {
      if (projectData[key] === undefined || projectData[key] === '') {
        delete projectData[key]
      }
    })

    const newProject = await Project.create(projectData)

    return NextResponse.json(
      { message: 'Project created', project: newProject },
      { status: 201 },
    )
  } catch (error) {
    console.error('Project creation error:', error) // Better error logging
    return NextResponse.json(
      {
        message: 'Error creating project',
        error: error.message,
      },
      { status: 500 },
    )
  }
}
