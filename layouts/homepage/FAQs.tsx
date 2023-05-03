import { Orbitron } from 'next/font/google'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })

function FAQs() {
  return (
    <div className={`text-white flex flex-col self-center mt-4 p-32 ${orbitron.className}`}>
      <span className='font-semibold text-4xl'>FAQS</span>
    </div>
  )
}

export default FAQs