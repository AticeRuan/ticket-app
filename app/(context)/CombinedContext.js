'use client'

import { TicketProvider } from './TicketContext'
import { ProjectProvider } from './ProjectContext'
import { UserProvider } from './UserContext'

export function Providers({ children }) {
  return (
    <UserProvider>
      <ProjectProvider>
        <TicketProvider>{children}</TicketProvider>
      </ProjectProvider>
    </UserProvider>
  )
}
