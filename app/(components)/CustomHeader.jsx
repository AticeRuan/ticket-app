'use client'
import Avatar from './common/Avatar'

import { usePathname } from 'next/navigation'
import { icons } from '../(utils)/constants'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../(context)/AuthContext'
import { useEffect, useState } from 'react'
import { set } from 'mongoose'

const CustomHeader = () => {
  const pathname = usePathname()
  const text = pathname.split('/')[2] || 'Dashboard'
  const { user, logout } = useAuthContext()
  const router = useRouter()
  const [userName, setUserName] = useState('?')
  const [email, setEmail] = useState('')

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name)
      setEmail(user.email)
    }
  }, [user])

  return (
    <section className="flex items-center w-full  px-[40px] py-[25px] justify-between bg-chill-black/80 sm:bg-transparent fixed top-0 z-20 sm:static backdrop-blur-lg">
      <h1 className="text-chill-white sm:text-chill-black text-3xl sm:text-[40px] tracking-[0.16px] capitalize">
        {text}
      </h1>
      <div className="flex items-center gap-1 sm:gap-[10px] justify-between bottom-5 right-5 z-10">
        <div className="relative group">
          <Avatar username={userName} />
          <span className="absolute px-2 py-1 rounded-lg border bg-chill-black/20 text-xs border-chill-black/80 backdrop-blur-md shadow-xl text-chill-black/80 top-[50px] -left-[30px] hidden  group-hover:block z-30">
            {email}
          </span>
        </div>
        <button
          className={`w-[48px] h-[48px] flex items-center  justify-center rounded-full bg-chill-orange active:scale-75 shadow-lg -ml-5 sm:ml-0 group relative`}
          onClick={handleLogout}
        >
          <span className="absolute p-1 rounded-lg border bg-chill-black/20 text-xs border-chill-black/80 backdrop-blur-md shadow-xl text-chill-black/80 top-[50px] left-[3px] hidden  group-hover:block">
            Logout
          </span>
          <span className="w-[34px] h-[34px] rounded-full p-[5px] ">
            {icons.ShutdownIcon({ color: 'white' })}
          </span>
        </button>
      </div>
    </section>
  )
}

export default CustomHeader
