'use client'
import React, { useState, useEffect } from 'react'
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
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 500)
    }
    handleResize() // Initial check
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavButtonClick = () => {
    if (window.innerWidth < 500) {
      setCollapsed(true)
    }
  }

  return (
    <>
      {' '}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <TicketForm onClose={handleCloseModal} />
      </Modal>
      <nav
        className={` h-full ${
          collapsed ? 'sm:px-[30px] ' : 'px-[46px]  '
        } pt-[140px] bg-chill-black/80  sm:bg-chill-black fixed z-50 sm:static  items-center transition-all duration-300 backdrop-blur-lg sm:backdrop-blur-none`}
      >
        {' '}
        <button
          className={`w-[30px] h-[30px] flex items-center justify-center bg-chill-white rounded-full shadow-lg absolute top-[20px] ${
            collapsed ? '-right-[35px] sm:-right-[15px]' : '-right-[15px]'
          } border backdrop-blur-md`}
          onClick={() => setCollapsed(!collapsed)}
        >
          <span
            className="w-[20px] h-[20px] "
            style={{ transform: collapsed ? 'rotate(180deg)' : '' }}
          >
            {icons.BackIcon({ color: 'black' })}
          </span>
        </button>
        <div
          className={`  items-center h-full gap-[40px] sm:gap-[100px] flex-col ${
            collapsed ? 'hidden sm:flex' : 'flex'
          }`}
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
                  onClick={handleNavButtonClick}
                  text={link.name}
                  url={link.url}
                  active={pathname.startsWith(link.url)}
                  collapse={collapsed}
                  icon={IconComponent}
                  iconColor={
                    pathname.startsWith(link.url) ? '#E65F2B' : 'white'
                  }
                />
              )
            })}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Nav
