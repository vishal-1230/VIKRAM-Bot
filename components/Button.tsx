import React from 'react'

function Button({title, Icon}) {
  return (
    <button type="button" className='flex flex-row text-center px-6 py-2.5 w-fit bg-blue-500 text-white text-sm rounded-lg bg-gradient-button self-center'>
        {title}
        <Icon extras="ml-1.5 mt-0.5" />
    </button>
  )
}

export default Button