'use client'
import React, { useState } from 'react'
import { navlinks, icons } from '../(utils)/constants'
import NavButton from './common/NavButton'
import { usePathname } from 'next/navigation'
import CreateButton from './common/CreateButton'
import TicketForm from './TicketForm'
import Modal from './common/Modal'

const Nav = () => {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateTicket = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
        <div
          className={`-mt-24 flex gap-4 items-center justify-center ${
            collapsed ? 'ml-0' : '-ml-2'
          }`}
        >
          <span className="w-10 h-10">
            {' '}
            {icons.LogoIcon({ collapsed: collapsed })}{' '}
          </span>

          {!collapsed && (
            <h1 className="text-xl whitespace-nowrap font-bold text-chill-white">
              Ticket Axis{' '}
            </h1>
          )}
        </div>
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
                active={pathname.startsWith(link.url)}
                collapse={collapsed}
                icon={IconComponent}
                iconColor={pathname.startsWith(link.url) ? '#E65F2B' : 'white'}
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
      </nav>
    </>
  )
}

export default Nav
