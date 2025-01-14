'use client'
import React from 'react'
import CustomHeader from '../(components)/CustomHeader'
import Nav from '../(components)/Nav'
import { useAuthContext } from '../(context)/AuthContext'
import { useRouter } from 'next/navigation'

const WorkspaceLayout = ({ children }) => {
  const { user } = useAuthContext()
  const router = useRouter()
  if (!user) {
    router.push('/')
  }
  return (
    <div className="flex  h-full w-screen relative">
      <Nav />
      <div className="flex-grow flex flex-col overflow-y-auto bg-chill-light-orange h-full">
        <CustomHeader />
        {children}
      </div>
    </div>
  )
}

export default WorkspaceLayout
