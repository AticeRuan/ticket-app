'use client'
import React, { useState } from 'react'
import { useUserContext } from '../(context)/UserContext'
import { navlinks, icons } from '../(utils)/constants'
import NavButton from './common/NavButton'
import { usePathname } from 'next/navigation'
import CreateButton from './common/CreateButton'
import TicketForm from './TicketForm'
import Modal from './common/Modal'
import { useRouter } from 'next/navigation'

const Nav = () => {
  const { logout } = useUserContext()
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const validPaths = navlinks.map((link) => link.url)
  const showNav = validPaths.includes(pathname)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const router = useRouter()
  const handleCreateTicket = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!showNav) {
    return null
  }

  return (
    <>
      {' '}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TicketForm onClose={handleCloseModal} />
      </Modal>
      <nav
        className={`flex h-full ${
          collapsed ? 'px-[30px]' : 'px-[46px]'
        } pt-[140px] bg-chill-black  flex-col gap-[100px] relative items-center transition-all duration-300`}
      >
        <CreateButton
          collapse={collapsed}
          text="Create new ticket"
          onClick={handleCreateTicket}
        />
        <div className="flex items-center justify-center flex-col gap-[40px]">
          {navlinks.map((link) => {
            const IconComponent = icons[link.icon] || null
            return (
              <NavButton
                key={link.id}
                text={link.name}
                url={link.url}
                active={pathname == link.url}
                collapse={collapsed}
                icon={IconComponent}
                iconColor={pathname == link.url ? '#E65F2B' : 'white'}
              />
            )
          })}
        </div>
        <button
          className="w-[30px] h-[30px] flex items-center justify-center bg-chill-white rounded-full shadow-lg absolute top-[30px] -right-[15px]"
          onClick={() => setCollapsed(!collapsed)}
        >
          <span
            className="w-[20px] h-[20px] "
            style={{ transform: collapsed ? 'rotate(180deg)' : '' }}
          >
            {icons.BackIcon({ color: 'black' })}
          </span>
        </button>
        <button
          className={`w-[48px] h-[48px] flex items-center justify-center rounded-full bg-chill-orange mt-[50px] hover:opacity-75 active:scale-75 absolute bottom-[50px]`}
          onClick={handleLogout}
        >
          <span className="w-[34px] h-[34px] rounded-full p-[5px] ">
            {icons.ShutdownIcon({ color: 'white' })}
          </span>
        </button>
      </nav>
    </>
  )
}

export default Nav
