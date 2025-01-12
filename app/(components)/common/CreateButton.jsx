import React from 'react'
import { icons } from '../../(utils)/constants'
const CreateButton = ({
  text = 'Create new task',
  onClick,
  collapse = false,
}) => {
  return (
    <button
      className={`transition-all duration-300 ${
        collapse
          ? 'rounded-full bg-chill-orange w-[48px] h-[48px] flex items-center justify-center'
          : `bg-white flex items-center justify-center gap-[10px] rounded-[24px] shrink-0 w-[184px] h-[48px] `
      }`}
      onClick={onClick}
    >
      <div className="w-[34px] h-[34px] rounded-full bg-chill-orange p-[5px]">
        {icons.CreateIcon({ color: 'white' })}
      </div>
      {!collapse && <p className="text-[14px] font-[400]">{text}</p>}
    </button>
  )
}

export default CreateButton
