import Link from 'next/link'
import React from 'react'

const NavButton = ({
  icon: Icon,
  text = 'navItem',
  active = false,
  iconColor,
  url,
  collapse = false,
}) => {
  return collapse ? (
    <Link
      href={url}
      className={`w-[48px] h-[48px] flex items-center justify-center rounded-full transition-all duration-300 ${
        active ? 'bg-white' : ''
      }`}
    >
      <span className="w-[34px] h-[34px] rounded-full p-[5px]">
        {Icon && <Icon color={iconColor} />}
      </span>
    </Link>
  ) : (
    <Link
      href={url}
      className={`items-center justify-start flex py-[13px] pl-[16px] shrink-0  gap-[10px] w-[184px] h-[48px] transition-all duration-300 ${
        !active
          ? 'text-chill-white  flex  rounded-full'
          : 'bg-white   rounded-[24px]  text-chill-orange'
      }`}
    >
      <span className="w-[34px] h-[34px] rounded-full p-[5px]  transition-all duration-300">
        {Icon && <Icon color={iconColor} />}
      </span>
      <p className="capitalize text-[16px]">{text}</p>
    </Link>
  )
}

export default NavButton
