export const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token')

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  }

  const finalOptions = {
    ...options,
    headers,
  }

  return fetch(url, finalOptions)
}
