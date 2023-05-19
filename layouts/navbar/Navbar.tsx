import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavLink from '@/components/NavLink'
import OutlineButton from '@/components/OutlineButton'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

function Navbar(  ) {
  return (
    <div className={`bg-bg-900 flex flex-row justify-evenly items-center w-screen h-20 px-0 py-8 z-50 ${inter.className}`} style={{justifyContent: 'space-evenly', alignItems: 'center', boxShadow: "0px 20px 24px -4px rgba(3, 5, 12, 0.08), 0px 8px 8px -4px rgba(3, 5, 12, 0.03)"}}>
        
        <Link href="/" className='navbar-logo cursor-pointer'>
            <Image src='/assets/navlogo1.png' alt='VIKRAM Logo' width={55} height={34} priority />
        </Link>

        <div className='navbar-links hidden md:block'>
            <NavLink href="/" active>Home</NavLink>
            <NavLink href="/about-us">About</NavLink>
            <NavLink href="/features">Features</NavLink>
            <NavLink href="/use-cases">Use Case</NavLink>
            <NavLink href="/blogs">Blogs</NavLink>
            {/* <NavLink>Contact Us</NavLink> */}
        </div>

        <div className='profile cursor-pointer flex'>
          <Link href="/contact-us">
            <OutlineButton title='Contact Us' buttonStyle='mr-8' />
          </Link>
          <Image src='/assets/profileIcon.svg' alt='Profile' width={30} height={30} priority />
        </div>

    </div>
  )
}

export default Navbar