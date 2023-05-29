import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavLink from '@/components/NavLink'
import OutlineButton from '@/components/OutlineButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CloseOutlined, MenuOpenOutlined } from '@mui/icons-material'
import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

function Navbar() {

  const router = useRouter()
  console.log(router.pathname)

  const [navbarOpen, setNavbarOpen] = useState(false)

  const openMobileNavbar = () => {
    setNavbarOpen(true)
  }

  const closeMobileNavbar = () => {
    setNavbarOpen(false)
  }
  

  return (
    <div className={`bg-bg-900 flex flex-row duration-200 justify-between ${router.pathname.startsWith("/chat-bot") ? "px-5 md:px-32" : "px-6 md:px-48"} items-center w-screen h-20 px-0 py-8 z-50 ${inter.className}`} style={{boxShadow: "0px 20px 24px -4px rgba(3, 5, 12, 0.08), 0px 8px 8px -4px rgba(3, 5, 12, 0.03)"}}>
        
        <Link href="/" className='navbar-logo cursor-pointer'>
            <Image src='/assets/navlogo1.png' alt='VIKRAM Logo' width={55} height={34} priority />
        </Link>

        {
          router.pathname.startsWith("/chat-bot") ? (
            null
          ) : (
        <div className={`flex-col absolute top-0 left-0 bg-bg-900 gap-5 md:gap-0 py-6 md:py-0 w-full h-screen z-50 md:w-fit md:h-fit ${navbarOpen ? "flex"  : "hidden"} md:relative md:bg-transparent md:!block`} id="navbar">
            <CloseOutlined className="w-7 h-7 text-white md:hidden ml-auto mr-5" onClick={closeMobileNavbar} />
            <NavLink closeNavbar={closeMobileNavbar} href="/" active ={router.pathname === "/"}>Home</NavLink>
            <NavLink closeNavbar={closeMobileNavbar} href="/about-us" active ={router.pathname === "/about-us"}>About</NavLink>
            <NavLink closeNavbar={closeMobileNavbar} href="/#features" active ={router.pathname === "/#features"}>Features</NavLink>
            <NavLink closeNavbar={closeMobileNavbar} href="/#use-cases" active ={router.pathname === "/#use-cases"}>Use Case</NavLink>
            <NavLink closeNavbar={closeMobileNavbar} href="/blogs" active ={router.pathname === "/blogs"}>Blogs</NavLink>
            {/* <NavLink>Contact Us</NavLink> */}
        </div>
          )
        }

        <div className='profile cursor-pointer flex gap-10 items-center'>
          {
            router.pathname.startsWith("/chat-bot") ? (
              <div className="flex gap-10">
                <span className="text-warning-500 font-medium flex gap-3 self-end">Upgrade Plan <img src="/assets/thunder-gold.svg" alt="" className="w-3.5 self-start mt-1" /></span>
                <span className="text-white hidden md:block">Help</span>
              </div>
            ) : (
              <Link href="/contact-us" className='hidden md:block'>
                <OutlineButton title='Contact Us' buttonStyle='mr-8' />
              </Link>
            )
          }
          <Link href="/auth/create-account" className='self-center flex gap-5 items-center'>
            {
              router.pathname.startsWith("/chat-bot") && <span className="text-white hidden md:block">Full Name</span>
            }
            <Image src='/assets/profileIcon.svg' alt='Profile' className='hidden md:block' width={30} height={30} priority />
          </Link>
            <MenuOpenOutlined className="w-8 h-8 text-white md:hidden" onClick={openMobileNavbar} />
        </div>

    </div>
  )
}

export default Navbar