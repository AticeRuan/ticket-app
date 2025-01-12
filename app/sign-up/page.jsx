'use client'
import { SignupForm } from '../(components)/AuthForm'
import { useUserContext } from '../(context)/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const { isAuthenticated } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <div className="container mx-auto p-4">
      <SignupForm />
      <div className="text-center mt-4">
        <p>
          Already have an account?
          <Link
            href="/login"
            className="text-blue-500 hover:text-blue-700 ml-1"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
