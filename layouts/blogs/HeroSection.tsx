import OutlineButton from '@/components/OutlineButton'
import { Orbitron } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })

function HeroSection(props: { title: string, previewParagraph: string[], image: string, buttonText?: string, buttonLink?: string }) {
  return (
    <div className='bg-bg-900 flex gap-6 md:gap-12 flex-col-reverse md:flex-row pt-6 pb-10 md:py-28 px-6 md:px-24'>
        <div className="flex flex-col">
          <span className={`text-white font-medium text-4xl md:text-5xl mb-5 ${orbitron.className}`}>{props.title}</span>
          {
            props.previewParagraph.map((paragraph, index) => {
              return <p key={index} className='text-neutral-500 font-normal text-base md:text-lg mt-5'>{paragraph}</p>
            })
          }
          <Link href="/blogs/1" passHref>
            <OutlineButton title={props.buttonText ? props.buttonText : "Read more"} buttonStyle='mt-10 w-fit' />
          </Link>
        </div>
        <img src={props.image} alt="Blog Image Special" className='rounded md:w-1/2 object-cover' />
    </div>
  )
}

export default HeroSection