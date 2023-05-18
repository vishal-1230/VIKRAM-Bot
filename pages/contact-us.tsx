import SpecialText from '@/components/SpecialText'
import ContactForm from '@/layouts/contact-box/ContactForm'
import { Mail } from '@mui/icons-material'
import { Inter, Orbitron } from 'next/font/google'
import Link from 'next/link'
import React from 'react'

const orbitron = Orbitron({subsets: ["latin"]})
const inter = Inter({subsets: ["latin"]})

function ContactUs() {
  return (
    <div className={`flex flex-col bg-bg-900 w-full items-center ${inter.className}`}>

        <span className={`text-5xl font-bold text-white ${orbitron.className}`}>
            Get in <SpecialText extra="text-5xl font-bold">Touch</SpecialText>
        </span>

        <span className="mt-5 text-neutral-500">Got questions or ideas? We'd love to chat! Hit us up through our contact form or email, and we'll get back to you ASAP.</span>

        <Link href="mailto:mail@vikram.ai" className='text-2xl font-medium text-neutral-500 mt-10'><Mail className='fill-neutral-500 w-5 h-4' />Email us at: <span className='text-primary-500'>contact@vikram.com</span></Link>

        <ContactForm showTitle />

    </div>
  )
}

export default ContactUs