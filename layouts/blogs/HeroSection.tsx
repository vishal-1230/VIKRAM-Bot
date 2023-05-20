import OutlineButton from '@/components/OutlineButton'
import { Orbitron } from 'next/font/google'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })

function HeroSection(props: { title: string, previewParagraph: string[], image: string, buttonText?: string, buttonLink?: string }) {
  return (
    <div className='bg-bg-900 flex gap-12 flex-col-reverse md:flex-row py-28 px-6 md:px-24'>
        <div className="flex flex-col">
          <span className={`text-white font-medium text-5xl mb-5 ${orbitron.className}`}>{props.title}</span>
          {
            props.previewParagraph.map((paragraph, index) => {
              return <p key={index} className='text-neutral-500 font-normal text-lg mt-5'>{paragraph}</p>
            })
          }
          <OutlineButton title={props.buttonText ? props.buttonText : "Learn more"} buttonStyle='mt-10 w-fit' />
        </div>
        <img src={props.image} alt="Blog Image Special" className='rounded md:w-1/2 object-cover' />
    </div>
  )
}

export default HeroSection