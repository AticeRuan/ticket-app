'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useUserContext } from './(context)/UserContext'
import { useEffect, useState } from 'react'
import Modal from './(components)/common/Modal'
import { LoginForm, SignupForm } from './(components)/AuthForm'

export default function LandingPage() {
  const { isAuthenticated } = useUserContext()
  const [isLoginOrSignup, setIsLoginOrSignup] = useState(null)
  const isLogin = isLoginOrSignup === 'login'
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleLoginModal = () => {
    setIsLoginOrSignup('login')
    setOpenModal(true)
  }

  const handleSignupModal = () => {
    setIsLoginOrSignup('signup')
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleFormTypeChange = (type) => {
    setIsLoginOrSignup(type)
  }
  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-radial from-chill-light-orange to-white text-black">
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        {isLogin ? (
          <LoginForm onFormTypeChange={handleFormTypeChange} />
        ) : (
          <SignupForm onFormTypeChange={handleFormTypeChange} />
        )}
      </Modal>
      {/* Header Section */}
      <header className="w-full p-6 flex justify-between items-center bg-chill-black text-white">
        <h1 className="text-3xl font-bold">Ticket Axis </h1>
        <nav className="flex gap-6">
          <button
            onClick={handleLoginModal}
            className="hover:text-chill-orange"
          >
            Login
          </button>
          <button
            onClick={handleSignupModal}
            className="hover:text-chill-orange"
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-5xl font-bold text-chill-orange mb-6">
          Simplify Your Ticket Management
        </h2>
        <p className="text-lg max-w-3xl text-gray-700 mb-10">
          Ticket Hub empowers teams to seamlessly track, manage, and prioritize
          tasks and tickets in a collaborative workspace. Start improving your
          workflow today.
        </p>

        <button
          className="px-8 py-4 bg-chill-orange text-white rounded-md hover:bg-orange-600 transition"
          onClick={handleLoginModal}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 p-12">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/icons/easy-to-use.svg"
            alt="Easy to use"
            width={64}
            height={64}
          />
          <h3 className="text-xl font-semibold mt-4">Easy to Use</h3>
          <p className="text-gray-600 mt-2">
            Intuitive and user-friendly interface for everyone.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/icons/track-progress.svg"
            alt="Track Progress"
            width={64}
            height={64}
          />
          <h3 className="text-xl font-semibold mt-4">Track Progress</h3>
          <p className="text-gray-600 mt-2">
            Keep tabs on tasks with real-time updates.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image
            src="/icons/collaborate.svg"
            alt="Collaborate"
            width={64}
            height={64}
          />
          <h3 className="text-xl font-semibold mt-4">Collaborate</h3>
          <p className="text-gray-600 mt-2">
            Work together effectively as a team.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full p-6 bg-chill-black text-white flex justify-between">
        <p>&copy; 2025 Chill Otters. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="/" className="hover:text-chill-orange">
            About
          </Link>
          <Link href="/" className="hover:text-chill-orange">
            Contact
          </Link>
        </nav>
      </footer>
    </main>
  )
}
