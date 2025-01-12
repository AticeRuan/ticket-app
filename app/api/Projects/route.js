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
  const authResponse = await verifyJWT(req)
  if (authResponse.status === 401) {
    return authResponse
  }
  try {
    const body = await req.json()
    const projectData = body.formData

    // Convert string dates to Date objects
    if (projectData.startDate) {
      projectData.startDate = new Date(projectData.startDate)
    }
    if (projectData.dueDate) {
      projectData.dueDate = new Date(projectData.dueDate)
    }

    const newProject = await Project.create(projectData)
    return NextResponse.json(
      { message: 'Project created', project: newProject },
      { status: 201 },
    )
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Error', error }, { status: 500 })
  }
}
