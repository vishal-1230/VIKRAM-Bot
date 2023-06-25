import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavLink from '@/components/NavLink'
import OutlineButton from '@/components/OutlineButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { CloseOutlined, MenuOpenOutlined } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'

const inter = Inter({ subsets: ['latin'] })

function Navbar() {

  const router = useRouter()
  console.log(router.pathname)

  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  const [userDetail, setUserDetail] = useState<any>(null)

  const [navbarOpen, setNavbarOpen] = useState(false)

  const openMobileNavbar = () => {
    setNavbarOpen(true)
  }

  const closeMobileNavbar = () => {
    setNavbarOpen(false)
  }

  const [showInfoBox, setShowInfoBox] = useState<boolean>(false)

  const [userDetails, setUserDetails] = useState<any>(null)

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
    } else {
      setLoggedIn(false)
    }
    if(localStorage.getItem("user")) {
      const user = localStorage.getItem("user")
      const parsed = JSON.parse(user ? user : "{}")
      setUserDetails(parsed)
    }
  }, [])
  

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
            <CloseOutlined className="w-7 h-7 text-white block md:!hidden ml-auto mr-5" onClick={closeMobileNavbar} />
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
          {/* <Link href="/auth/create-account" className='self-center flex gap-5 items-center'> */}
            {
              router.pathname.startsWith("/chat-bot") && <span className="text-white hidden md:block">{userDetails?.name}</span>
            }
            <div className="relative">
              <Image src='/assets/profileIcon.svg' alt='Profile' className='hidden md:block' width={30} height={30} priority onClick={()=>{
                if (loggedIn) {
                  setShowInfoBox(!showInfoBox)
                } else {
                  router.push("/auth/login")
                }
              }} />
              {
              showInfoBox && <div className="bg-white absolute top-[35px] pb-6 rounded-lg right-0 flex flex-col">
                <div className="flex flex-col gap-1 p-6 items-end justify-center">
                  {/* <span className="font-medium text-sm">Logged in as</span> */}
                  <span className="font-medium text-sm">{userDetails?.name}</span>
                  <span className="font-medium text-sm">{userDetails?.email_id || userDetails?.email}</span>
                  <span className="font-medium text-sm">{userDetails?.phone}</span>
                  <span className="font-medium text-sm">{userDetails?.business_b}</span>
                  {/* settings */}
                  {/* <div className="flex flex-col gap-2 mt-4"> */}
                    {/* <span className="font-medium text-sm">Settings</span> */}
                    {/* <span className="font-medium text-sm">Change Password</span>
                    <span className="font-medium text-sm">Change Email</span>
                    <span className="font-medium text-sm">Change Phone</span>
                    <span className="font-medium text-sm">Change Rules & other info</span> */}
                  {/* </div> */}
                </div>
                  <OutlineButton buttonStyle='text-sm p-2 self-end mr-5' title="Settings" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"}} />
                  <PrimaryButton buttonStyle='text-sm p-3 self-end mr-5 mt-2' title="Logout" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"}} />
              </div>
              }
            </div>
          {/* </Link> */}
          
            <MenuOpenOutlined className="w-8 h-8 text-white md:!hidden" onClick={openMobileNavbar} />
        </div>

    </div>
  )
}

export default Navbar