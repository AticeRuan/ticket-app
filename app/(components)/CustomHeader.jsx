'use client'
import React, { useEffect } from 'react'
import Avatar from './common/Avatar'
import CustomInput from './common/CustomInput'
import { usePathname } from 'next/navigation'
import { useUserContext } from '../(context)/UserContext'
import { icons, navlinks } from '../(utils)/constants'
import { useRouter } from 'next/navigation'
import { isValidPath } from '../(utils)/isValidPath '
const CustomHeader = () => {
  const pathname = usePathname()
  const text = pathname === '/' ? 'Dashboard' : pathname.split('/')[1]

  const validPaths = navlinks.map((link) => link.url)
  const showHeader = isValidPath(pathname, validPaths)

  const { user, isAuthenticated, logout } = useUserContext()
  const router = useRouter()
  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const name = user?.name || '?'
  if (!showHeader) {
    return null
  }
  return (
    <section className="flex items-center w-full  px-[40px] py-[25px] justify-between">
      <h1 className="text-chill-black text-[40px] tracking-[0.16px] capitalize">
        {text}
      </h1>
      <div className="flex items-center gap-[10px] justify-between ">
        <Avatar username={name} />
        <button
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-full bg-chill-orange hover:opacity-75 active:scale-75 shadow-lg`}
          onClick={handleLogout}
        >
          <span className="w-[34px] h-[34px] rounded-full p-[5px] ">
            {icons.ShutdownIcon({ color: 'white' })}
          </span>
        </button>
      </div>
    </section>
  )
}

export default CustomHeader
