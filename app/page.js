'use client'

import Link from 'next/link'
import Image from 'next/image'

import { useAuthContext } from './(context)/AuthContext'
import { useState } from 'react'
import Modal from './(components)/common/Modal'
import { LoginForm, SignupForm } from './(components)/AuthForm'
import { icons } from './(utils)/constants'

export default function LandingPage() {
  const { user, isAuthenticated } = useAuthContext()
  const [isLoginOrSignup, setIsLoginOrSignup] = useState(null)
  const isLogin = isLoginOrSignup === 'login'
  const [openModal, setOpenModal] = useState(false)

  const handleLoginModal = () => {
    setIsLoginOrSignup('login')
    setOpenModal(true)
  }

  const handleSignupModal = () => {
    setIsLoginOrSignup('signup')
    setOpenModal(true)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  const handleFormTypeChange = (type) => {
    setIsLoginOrSignup(type)
  }

  const date = new Date()
  const year = date.getFullYear()

  return (
    <main className="flex flex-col items-center justify-between min-h-screen bg-gradient-radial from-chill-light-orange to-white text-black w-full">
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        {isLogin ? (
          <LoginForm
            onFormTypeChange={handleFormTypeChange}
            onClose={handleCloseModal}
          />
        ) : (
          <SignupForm
            onFormTypeChange={handleFormTypeChange}
            onClose={handleCloseModal}
          />
        )}
      </Modal>
      {/* Header Section */}
      <header className="w-full p-6 flex justify-between items-center bg-chill-black text-white">
        <div className="flex gap-2 items-center">
          {' '}
          <span className="w-6 sm:w-8 h-6 sm:h-8 mt-1">
            {' '}
            {icons.LogoIcon()}{' '}
          </span>{' '}
          <h1 className="text-xl sm:text-3xl font-bold">Ticket Axis </h1>
        </div>

        <nav className="flex gap-6">
          {isAuthenticated ? (
            <div className="flex gap-1 flex-col items-end justify-center ">
              <p className="text-xs sm:text-sm whitespace-nowrap">
                Welcome back {user.name}!
              </p>
              <Link
                href="/workspace/dashboard"
                className="hover:text-chill-orange bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-700 p-1 rounded-md sm:text-base"
              >
                Go to WorkSpace
              </Link>
            </div>
          ) : (
            <>
              <button
                onClick={handleLoginModal}
                className="hover:text-chill-orange text-xs sm:text-base"
              >
                Login
              </button>
              <button
                onClick={handleSignupModal}
                className="hover:text-chill-orange text-xs sm:text-base"
              >
                Sign Up
              </button>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center mt-20 px-6">
        <h2 className="text-5xl font-bold text-chill-orange mb-6">
          Simplify Your Ticket Management
        </h2>
        <p className="text-lg max-w-3xl text-gray-700 mb-10">
          Ticket Axis empowers teams to seamlessly track, manage, and prioritize
          tasks and tickets in a collaborative workspace. Start improving your
          workflow today.
        </p>

        <button
          className="px-8 py-4 bg-chill-orange text-white rounded-md hover:bg-orange-600 transition active:scale-95"
          onClick={handleSignupModal}
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 p-12">
        <div className="flex flex-col items-center text-center hover:scale-110 transition duration-700 group">
          <Image
            src="/assets/otter_easy.png"
            alt="Easy to use"
            width={500}
            height={500}
            className="p-8 group-hover:animate-pulse"
          />
          <h3 className="text-xl font-semibold mt-4">Easy to Use</h3>
          <p className="text-gray-600 mt-2">
            Intuitive and user-friendly interface for everyone.
          </p>
        </div>
        <div className="flex flex-col items-center text-center  hover:scale-110 transition duration-700 group">
          <Image
            src="/assets/otter_time.png"
            alt="Track Progress"
            width={500}
            height={500}
            className="p-8 group-hover:animate-pulse"
          />
          <h3 className="text-xl font-semibold mt-4">Track Progress</h3>
          <p className="text-gray-600 mt-2">
            Keep tabs on tasks with real-time updates.
          </p>
        </div>
        <div className="flex flex-col items-center text-center hover:scale-110 transition duration-700 group">
          <Image
            src="/assets/otter_colab.png"
            alt="Collaborate"
            width={500}
            height={500}
            className="p-8 group-hover:animate-pulse"
          />
          <h3 className="text-xl font-semibold mt-4">Collaborate</h3>
          <p className="text-gray-600 mt-2">
            Work together effectively as a team.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-xs md:text-base w-full p-6 bg-chill-black text-white flex justify-between ">
        <p>&copy; {year} Chill Otters. All rights reserved.</p>
        <nav className="flex gap-2 md:gap-4">
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
