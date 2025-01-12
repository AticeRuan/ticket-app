// app/login/page.js
'use client'
import { LoginForm } from '../(components)/AuthForm'
import { useUserContext } from '../(context)/UserContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const { isAuthenticated } = useUserContext()
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <div className="container mx-auto p-4">
      <LoginForm />
      <div className="text-center mt-4">
        <p>
          Don&apos;t have an account?
          <Link
            href="/sign-up"
            className="text-blue-500 hover:text-blue-700 ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
