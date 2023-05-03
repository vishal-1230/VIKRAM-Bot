import Button from '@/components/Button'
import FeaturesList from '@/components/FeaturesList'
import SpecialText from '@/components/SpecialText'
import { Orbitron } from 'next/font/google'
import React from 'react'

const orbitron = Orbitron({ subsets: ['latin'] })

function Features() {
  return (
    <div className='text-white flex flex-col'>
      <span className={`${orbitron.className} font-semibold text-4xl`}>Our <SpecialText extra={`${orbitron.className} font-semibold text-4xl`}>Features</SpecialText></span>
      <div>
        <FeaturesList features={[
          {
            image: '/assets/feature-image1.svg',
            description: 'Built-in learning for specific use cases like shopping, food delivery, ticket booking, and job search. So you get way better answers than chatgpt.'
          },
          {
            image: '/assets/feature-image2.svg',
            description: 'Conversations on WhatsApp that feel more human-like and less like AI.'
          },
          {
            image: '/assets/feature-image3.svg',
            description: "A long-term memory to store interactions, making it a perfect note-taking companion."
          },
          {
            image: "/assets/feature-image4.svg",
            description: "The power to browse the internet and fetch relevant data through web-scraping, like news, weather, and Wikipedia info."
          }
        ]} />
      </div>
        <Button title='So, Go Ahead and Get your Bot' buttonStyle='self-center mt-1' />
    </div>
  )
}

export default Features