import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavLink from '@/components/NavLink'

const inter = Inter({ subsets: ['latin'] })

function Navbar(  ) {
  return (
    <div className='flex flex-row justify-evenly items-center w-screen h-24 px-24 py-16' style={{justifyContent: 'space-evenly', alignItems: 'center', paddingTop: 26, paddingBottom: 26}}>
        
        <div className='navbar-logo cursor-pointer'>
            <Image src='/assets/navlogo1.png' alt='VIKRAM Logo' width={70} height={34} priority />
        </div>

        <div className='navbar-links'>
            <NavLink active>Home</NavLink>
            <NavLink>About</NavLink>
            <NavLink>Features</NavLink>
            <NavLink>Use Case</NavLink>
            <NavLink>Blog</NavLink>
            <NavLink>Contact Us</NavLink>
        </div>

        <div className='profile cursor-pointer'>
            <Image src='/assets/profileIcon.svg' alt='Profile' width={43} height={43} priority />
        </div>

    </div>
  )
}

export default Navbar