'use client'
import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useUserContext } from '../(context)/UserContext'
import { navlinks } from '../(utils)/constants'
import { isValidPath } from '../(utils)/isValidPath '
import Loading from '../(components)/common/Loading'

// Public paths that don't require authentication
const PUBLIC_PATHS = ['/']

// Protected paths from navlinks
const PROTECTED_PATHS = navlinks.map((link) => link.url)

export function AuthGuard({ children }) {
  const { isAuthenticated, loading } = useUserContext()
  const router = useRouter()
  const pathname = usePathname()
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    // Function to check authorization
    const authCheck = () => {
      // Don't do anything while still loading auth state
      if (loading) return

      const isProtectedRoute = isValidPath(pathname, PROTECTED_PATHS)
      const isPublicRoute = PUBLIC_PATHS.includes(pathname)

      // For public routes
      if (isPublicRoute) {
        if (isAuthenticated && pathname === '/') {
          router.push('/dashboard')
        } else {
          setAuthorized(true)
        }
        return
      }

      // For protected routes
      if (isProtectedRoute) {
        if (!isAuthenticated) {
          setAuthorized(false)
          router.push('/')
        } else {
          setAuthorized(true)
        }
        return
      }

      // For all other routes, allow if authenticated
      setAuthorized(isAuthenticated)
    }

    authCheck()
  }, [isAuthenticated, loading, pathname, router])

  // Show nothing while loading auth state
  if (loading) {
    return <Loading />
  }

  // Show nothing while checking authorization
  if (!authorized) {
    return null
  }

  // Render children if authorized
  return children
}
