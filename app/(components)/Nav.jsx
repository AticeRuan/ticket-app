'use client'
import React from 'react'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome,
  faFile,
  faPortrait,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons'
import { useUserContext } from '../(context)/UserContext'
const Nav = () => {
  const { user, isAuthenticated, logout } = useUserContext()
  console.log(isAuthenticated)
  return (
    <nav className="flex justify-between bg-nav p-4">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <FontAwesomeIcon icon={faHome} className="icon" />
        </Link>

        <Link href="/project">
          <FontAwesomeIcon icon={faFile} className="icon" />
        </Link>
        <Link href="/users">
          <FontAwesomeIcon icon={faPortrait} className="icon" />
        </Link>
      </div>
      {isAuthenticated ? (
        <>
          <p className="text-default-text">{user?.email}</p>
          <button
            onClick={logout}
            className="text-default-text hover:text-gray-300"
          >
            <FontAwesomeIcon icon={faSignOut} className="icon" />
          </button>
        </>
      ) : (
        <>
          <Link href="/login" className="text-default-text hover:text-gray-300">
            Login
          </Link>
          <Link
            href="/sign-up"
            className="text-default-text hover:text-gray-300"
          >
            Sign Up
          </Link>
        </>
      )}
    </nav>
  )
}

export default Nav
