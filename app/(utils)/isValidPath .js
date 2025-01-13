// routeUtils.js

export function isValidPath(pathname, validPaths) {
  // Cache the cleaned pathname to avoid multiple splits
  const pathSegments = pathname.split('/').filter(Boolean)

  // Early return for root path
  if (pathSegments.length === 0) {
    return validPaths.includes('/')
  }

  // Check for exact match first
  if (validPaths.includes(pathname)) {
    return true
  }

  // Get the base route (first segment with leading slash)
  const baseRoute = `/${pathSegments[0]}`

  // Check if any valid path matches the base route
  return validPaths.some((path) => {
    const validPathSegments = path.split('/').filter(Boolean)
    // Match first segment
    return validPathSegments[0] === pathSegments[0]
  })
}

// Helper function to get display text for a route
export function getRouteDisplayText(pathname) {
  if (pathname === '/') return 'Dashboard'

  const segments = pathname.split('/').filter(Boolean)
  return segments[0].charAt(0).toUpperCase() + segments[0].slice(1)
}

// Helper function to check if a route is active
export function isRouteActive(currentPath, navPath) {
  const currentSegments = currentPath.split('/').filter(Boolean)
  const navSegments = navPath.split('/').filter(Boolean)

  return currentSegments[0] === navSegments[0]
}
