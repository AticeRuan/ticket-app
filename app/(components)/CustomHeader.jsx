'use client'
import React, { useEffect } from 'react'
import Avatar from './common/Avatar'
import CustomInput from './common/CustomInput'
import { usePathname } from 'next/navigation'
import { useUserContext } from '../(context)/UserContext'
import { navlinks } from '../(utils)/constants'
import { useRouter } from 'next/navigation'
const CustomHeader = () => {
  const pathname = usePathname()
  const text = pathname === '/' ? 'Dashboard' : pathname.split('/')[1]
  const validPaths = navlinks.map((link) => link.url)
  const showHeader = validPaths.includes(pathname)

  const { user, isAuthenticated } = useUserContext()
  const router = useRouter()
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [])
  const name = user?.name || '?'
  if (!showHeader) {
    return null
  }
  return (
    <section className="flex items-center w-full p-[25px] justify-between">
      <h1 className="text-chill-black text-[40px] tracking-[0.16px] capitalize">
        {text}
      </h1>
      <div className="flex items-center gap-[10px] justify-between ">
        <CustomInput placeholder="Search for anything" className="w-[300px]" />
        <Avatar username={name} />
      </div>
    </section>
  )
}

export default CustomHeader
