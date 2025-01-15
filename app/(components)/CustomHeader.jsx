'use client'
import Avatar from './common/Avatar'

import { usePathname } from 'next/navigation'
import { icons } from '../(utils)/constants'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '../(context)/AuthContext'
import { useEffect, useState } from 'react'

const CustomHeader = () => {
  const pathname = usePathname()
  const text = pathname.split('/')[2] || 'Dashboard'
  const { user, logout } = useAuthContext()
  const router = useRouter()
  const [userName, setUserName] = useState('?')

  const handleLogout = () => {
    logout()
  }

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name)
    }
  }, [user])

  return (
    <section className="flex items-center w-full  px-[40px] py-[25px] justify-between bg-chill-black sm:bg-transparent ">
      <h1 className="text-chill-white sm:text-chill-black text-3xl sm:text-[40px] tracking-[0.16px] capitalize">
        {text}
      </h1>
      <div className="flex items-center gap-1 sm:gap-[10px] justify-between sm:static absolute bottom-5 right-5 z-10">
        <Avatar username={userName} />
        <button
          className={`w-[48px] h-[48px] flex items-center  justify-center rounded-full bg-chill-orange hover:opacity-75 active:scale-75 shadow-lg -ml-5 sm:ml-0 `}
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
