import React from 'react'

function PrimaryButton(props : {title: string, buttonStyle?: string}) {
  return (
    <button type="button" className={`px-4 py-2 bg-primary-500 text-white rounded font-medium text-lg duration-200 transition hover:bg-gradient-to-r hover:from-gradient-pink hover:to-gradient-blue ${props.buttonStyle}`}>
        {props.title}
    </button>
  )
}

export default PrimaryButton