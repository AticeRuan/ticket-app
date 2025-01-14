'use client'

import { TicketProvider } from './TicketContext'
import { ProjectProvider } from './ProjectContext'
import { UserProvider } from './UserContext'
import { AuthProvider } from './AuthContext'

export function Providers({ children }) {
  return (
    <AuthProvider>
      <UserProvider>
        <ProjectProvider>
          <TicketProvider>{children}</TicketProvider>
        </ProjectProvider>
      </UserProvider>
    </AuthProvider>
  )
}
