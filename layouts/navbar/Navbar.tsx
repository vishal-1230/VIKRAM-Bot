import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavLink from '@/components/NavLink'
import OutlineButton from '@/components/OutlineButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AlternateEmail, BorderColor, Call, CloseOutlined, CloudUpload, ContentCopy, Edit, EditOutlined, MailOutline, MenuOpenOutlined, ModeEdit, Person, Person2, Person2Outlined, UploadFile } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import { Chip, Dialog, Tooltip } from '@mui/material'
import { toast } from 'react-toastify'
import Button from '@/components/SpecialButton'
import { BsArrowLeft, BsClipboard } from 'react-icons/bs'
import {HiClipboardCopy} from "react-icons/hi"

const inter = Inter({ subsets: ['latin'] })

function useOutsideAlerter(ref: any, onBlur?: any) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onBlur()
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

function Navbar({showPersonalEditBox, setShowPersonalEditBox, showBusinessEditBox, setShowBusinessEditBox}: {showPersonalEditBox: boolean, setShowPersonalEditBox: any, showBusinessEditBox: boolean, setShowBusinessEditBox: any}) {

  const router = useRouter()
  console.log(router.pathname)

  const vikramTry = router.pathname.startsWith("/try-vikram-bots")

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, ()=>{setShowInfoBox(false)});

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

  const [infoLoading, setInfoLoading] = useState<boolean>(false)

  const [userDetails, setUserDetails] = useState<any>(null)

  const [showImageEditPencil, setShowImageEditPencil] = useState<boolean>(false)

  const [showImageEditDialog, setShowImageEditDialog] = useState<boolean>(false)

  const [newProfile, setNewProfile] = useState<File | null>(null)

  const [updatingProfile, setUpdatingProfile] = useState<boolean>(false)

  async function uploadProfile() {
    setUpdatingProfile(true)
    const formData = new FormData()
    formData.append("file", newProfile!)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : localStorage.getItem("temptoken")
    const res = await fetch(userDetails?.pic ? "https://server.vikrambots.in/edit-pic" : "https://server.vikrambots.in/add-pic", {
      method: "POST",
      headers: {
        "x-access-token": token!
      },
      body: formData
    })
    const data = await res.json()
    console.log(data)
    setUpdatingProfile(false)
    if (data.success === true) {
      toast.success("Profile picture updated successfully")
      setShowImageEditDialog(false)
      getInfo()
    }
  }

  async function getInfo() {
    setInfoLoading(true)
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : localStorage.getItem("temptoken")
    const res = await fetch("https://server.vikrambots.in/ginfo", {
      headers: {
        "x-access-token": token!
      }
    })
    const data = await res.json()
    console.log("profile from nav", data)
    setInfoLoading(false)

    setUserDetails(data)
  }

  useEffect(()=>{
    if (localStorage.getItem("token") || localStorage.getItem("temptoken")) {
      setLoggedIn(true)
      try{ 
        getInfo()
      } catch (err) {
        console.log(err)
      }
    } else {
      setLoggedIn(false)
    }
    // if(localStorage.getItem("user")) {
    //   const user = localStorage.getItem("user")
    //   const parsed = JSON.parse(user ? user : "{}")
    //   setUserDetails(parsed)
    // }
  }, [])
  

  return (
    <div className={`bg-bg-900 flex flex-row duration-200 justify-between ${(router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? "px-5 md:px-32 md:pl-8" : "px-6 md:px-48"} items-center w-screen h-20 px-0 py-8 z-50 ${inter.className}`} style={{boxShadow: "0px 20px 24px -4px rgba(3, 5, 12, 0.08), 0px 8px 8px -4px rgba(3, 5, 12, 0.03)"}}>
        
        {
          (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? (
            <Link href="/explore-bots" className='mr-4'>
              <span className="py-2 px-5 rounded-full bg-gradient-to-r from-gradient-dull-pink to-gradient-blue opacity-80 hover:opacity-100 hover:from-gradient-blue hover:to-gradient-pink duration-200 cursor-pointer flex gap-2">
                <BsArrowLeft className="w-5 h-5 text-white" />
                <span className="text-white font-medium text-sm">Explore Other Bots</span>
              </span>
            </Link>
          ) : null
        }
        
        <Link href="/" className={`navbar-logo cursor-pointer relative ${router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots") ? "mr-auto" : ""}`}>
            <Image src='/assets/navlogo1.png' alt='VIKRAM Logo' width={55} height={34} priority />
            <span className="absolute bottom-0 -right-2 text-white font-bold text-[0.6rem] p-0.5 px-1 rounded-md bg-warning-500">BETA</span>
        </Link>

        {
          (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? (
            null
          ) : (
        <div className={`flex-col absolute top-0 left-0 bg-bg-900 gap-5 md:gap-0 py-6 md:py-0 w-full h-screen z-50 md:w-fit md:h-fit ${navbarOpen ? "flex"  : "hidden"} md:relative md:bg-transparent md:!block`} id="navbar">
            <CloseOutlined className="w-7 h-7 z-[500] text-white block md:!hidden ml-auto mr-5" onClick={closeMobileNavbar} />
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
            (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? (
              <div className="flex gap-10">
                {/* <span className="text-warning-500 font-medium flex gap-3 self-end">Upgrade Plan <img src="/assets/thunder-gold.svg" alt="" className="w-3.5 self-start mt-1" /></span> */}
                <span className="text-white hidden md:block" onClick={()=>{router.push("/contact-us")}}>Help</span>
              </div>
            ) : (
              <Link href="/contact-us" className='hidden md:block'>
                <OutlineButton title='Contact Us' buttonStyle='mr-8' />
              </Link>
            )
          }
          {/* <Link href="/auth/create-account" className='self-center flex gap-5 items-center'> */}
            {
              (router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) && (infoLoading ? <img src="/assets/loading-circle.svg" className='w-6 h-6 ml-4' /> : <span className="text-white hidden md:block ml-4">{userDetails?.name}</span>)
            }
            <div className="relative" onBlur={()=>{
                if (loggedIn) {
                  setShowInfoBox(false)
                }
              }}>
                {
                  userDetails?.pic
                  ?
                  <img src={`https://server.vikrambots.in/assets/${userDetails?.pic}`} alt="" className="w-10 h-10 rounded-full self-center object-cover" onClick={()=>{
                    if (loggedIn) {
                      setShowInfoBox(!showInfoBox)
                    } else {
                      router.push("/auth/login")
                    }
                  }} />
                  :
                  <Image src='/assets/profileIcon.svg' alt='Profile' className=' ' width={30} height={30} priority onClick={()=>{
                    if (loggedIn) {
                      setShowInfoBox(!showInfoBox)
                    } else {
                      router.push("/auth/login")
                    }
                  }}  />
                }
              {
              showInfoBox && (!vikramTry ? <div className="bg-bg-500 absolute top-[35px] min-w-[14rem] pb-6 rounded-lg w-max -right-14 md:right-0 flex shadow-lg drop-shadow-md flex-col" ref={wrapperRef}>
                {
                  infoLoading ? <img src="/assets/loading-circle.svg" alt="" className="w-10 mb-8 self-center mt-10" /> :
                <div className="flex text-neutral-50 flex-col gap-1 p-6 items-start justify-center">
                  {/* <span className="font-medium text-sm">Logged in as</span> */}
                  {/* <Image src='/assets/avatar.jpg' alt='Profile' className='w-20 h-20 rounded-full self-center' width={30} height={30} /> */}
                  <div className="w-fit h-fit rounded-full relative mb-2 self-center" onMouseOver={()=>{
                    setShowImageEditPencil(true)
                  }} onMouseLeave={()=>{
                    setShowImageEditPencil(false)
                  }}>
                    <img src={userDetails?.pic ? `https://server.vikrambots.in/assets/${userDetails?.pic}` : "/assets/avatar.jpg"} alt="" className="w-24 h-24 object-cover rounded-full" />
                    {
                      showImageEditPencil ? 
                    <div className="absolute w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.45)] rounded-full flex flex-col items-center justify-center" onClick={()=>{
                      setShowImageEditDialog(true)
                    }}>
                      <Edit className='text-neutral-50 fill-neutral-50 w-8 h-8' />
                    </div>
                    :
                    null
                    }
                  </div>
                  <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Person /> {userDetails?.name}</span>
                  <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12" onClick={()=>{
                    // clipboard cpoy
                    navigator.clipboard.writeText(`https://dev-vikram.vercel.app/${userDetails?.username}`)
                    toast.success("Bot Link Copied to clipboard", {
                      position: "bottom-right",
                      autoClose: 1000
                    })
                  }}>
                    <AlternateEmail /> 
                    {userDetails?.username}
                    &nbsp;
                    <Tooltip title="Copy your bot link" placement="top" arrow>
                    <ContentCopy
                    className="w-5 h-5 text-neutral-50 mb-1 fill-neutral-50 cursor-pointer ml-auto" />
                    </Tooltip>
                  </span>
                  <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><MailOutline /> {userDetails?.email_id || userDetails?.email}</span>
                  <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Call /> {userDetails?.phone}</span>
                  {
                    userDetails?.b_username && <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><AlternateEmail /> {userDetails?.b_username}</span>
                  }
                  {/* settings */}
                  {/* <div className="flex flex-col gap-2 mt-4"> */}
                    {/* <span className="font-medium text-sm">Settings</span> */}
                    {/* <span className="font-medium text-sm">Change Password</span>
                    <span className="font-medium text-sm">Change Email</span>
                    <span className="font-medium text-sm">Change Phone</span>
                    <span className="font-medium text-sm">Change Rules & other info</span> */}
                  {/* </div> */}
                </div>
                }
                  <PrimaryButton buttonStyle='text-sm z-50 p-3 self-end mr-5 bg-red-500 mt-2' title="Logout" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}} />
              </div>
              :
              <div className='bg-bg-500 absolute top-[35px] min-w-[14rem] pt-3 rounded-lg w-max -right-14 md:right-0 flex shadow-lg drop-shadow-md flex-col' ref={wrapperRef}>
                <div className="flex text-neutral-50 flex-col gap-1 p-6 items-start justify-center">
                    <img src={userDetails?.pic ? `https://server.vikrambots.in/assets/${userDetails?.pic}` : "/assets/avatar.jpg"} alt="" className="w-24 h-24 object-cover self-center rounded-full" />
                    <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Person /> {userDetails?.name ? userDetails?.name : "Your Name"}</span>
                    <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><Call /> {userDetails?.phone ? userDetails?.phone : "+91 8373958829"}</span>
                  {/* <Link href="/explore-bots" onClick={()=>{
                    setShowInfoBox(false)
                  }}>
                    <Button title="Explore More Bots" buttonStyle='mt-4 font-medium' /> 
                  </Link> */}
                  {/* <PrimaryButton buttonStyle='text-sm p-3 self-end mt-2' title="Create Your own Bot" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}} /> */}
                  <PrimaryButton buttonStyle='text-sm p-3 self-end bg-red-500 mt-2' title="Logout" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("temptoken"); localStorage.removeItem("user"); window.location.href = "/"}} />
                </div>
              </div>)
              }
                    <Dialog open={showImageEditDialog} onClose={()=>setShowImageEditDialog(false)}>
                      <div className={`flex flex-col gap-8 p-6 items-center justify-center bg-white rounded-xl ${inter.className}`}>
                        <span className="font-semibold text-lg">Change Profile Picture</span>
                        <div className="flex flex-row gap-5">
                          
                          <img src={(newProfile!=null && !vikramTry) ? URL.createObjectURL(newProfile) : userDetails?.pic ? `https://server.vikrambots.in/assets/${userDetails?.pic}` : "/assets/avatar.jpg"} alt="" className="w-24 h-24 object-cover rounded-full" />

                          <div className="flex flex-col gap-2">
                            <span className="font-medium text-sm flex flex-row items-center gap-2 self-center text-black fill-black">Upload a new picture <CloudUpload  /> </span>
                            <input
                              type="file"
                              name=""
                              id=""
                              className="border border-neutral-200 rounded-md p-2"
                              onChange={(e)=>{
                                const file = e.target.files![0]
                                setNewProfile(file)
                              }}
                            />
                          </div>

                        </div>
                        <PrimaryButton title="Upload" loading={updatingProfile} onClick={uploadProfile} buttonStyle="w-full" />
                      </div>
                    </Dialog>
            </div>
          {/* </Link> */}
            <MenuOpenOutlined className={`w-8 h-8 text-white md:!hidden ${(router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? "-z-10" : ""}`} onClick={()=>{
              openMobileNavbar()
            }} />
        </div>

    </div>
  )
}

export default Navbar