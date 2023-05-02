import Image from 'next/image'
import React from 'react'

function Button({
    title,
    Icon=({extras} : {extras : string})=>{
      return <Image src='/assets/button-arrow.svg' className={extras} alt='Arrow' width={15} height={15} priority />
    },
    buttonStyle
  } : {title: string, Icon?: any, buttonStyle?: string}) {
  return (
    <button type="button" className={`flex flex-row text-center px-6 py-2.5 w-fit bg-blue-500 text-white text-sm rounded-lg bg-gradient-button self-center ${buttonStyle}`}>
        {title}
        <Icon extras="ml-1.5 mt-0.5" />
    </button>
  )
}

export default Button