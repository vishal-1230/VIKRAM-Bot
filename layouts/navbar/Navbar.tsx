import Image from 'next/image'
import { Inter } from 'next/font/google'
import NavLink from '@/components/NavLink'
import OutlineButton from '@/components/OutlineButton'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AlternateEmail, BorderColor, Call, CloseOutlined, CloudUpload, Edit, EditOutlined, MailOutline, MenuOpenOutlined, ModeEdit, Person, Person2, Person2Outlined, UploadFile } from '@mui/icons-material'
import { useEffect, useRef, useState } from 'react'
import PrimaryButton from '@/components/PrimaryButton'
import { Chip, Dialog } from '@mui/material'
import { toast } from 'react-toastify'

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
    const res = await fetch(userDetails?.pic ? "http://localhost:5000/edit-pic" : "http://localhost:5000/add-pic", {
      method: "POST",
      headers: {
        "x-access-token": localStorage.getItem("token")!
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
    const res = await fetch("http://localhost:5000/ginfo", {
      headers: {
        "x-access-token": localStorage.getItem("token")!
      }
    })
    const data = await res.json()
    console.log("profile from nav", data)
    setInfoLoading(false)

    setUserDetails(data)
  }

  useEffect(()=>{
    if (localStorage.getItem("token")) {
      setLoggedIn(true)
      getInfo()
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
    <div className={`bg-bg-900 flex flex-row duration-200 justify-between ${(router.pathname.startsWith("/chat-bot") || router.pathname.startsWith("/try-vikram-bots")) ? "px-5 md:px-32" : "px-6 md:px-48"} items-center w-screen h-20 px-0 py-8 z-50 ${inter.className}`} style={{boxShadow: "0px 20px 24px -4px rgba(3, 5, 12, 0.08), 0px 8px 8px -4px rgba(3, 5, 12, 0.03)"}}>
        
        <Link href="/" className='navbar-logo cursor-pointer relative'>
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
                  <img src={`http://localhost:5000/assets/${userDetails?.pic}`} alt="" className="w-10 h-10 rounded-full self-center" onClick={()=>{
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
              showInfoBox && vikramTry ? <div className="bg-bg-500 absolute top-[35px] min-w-[14rem] pb-6 rounded-lg w-max -right-14 md:right-0 flex shadow-lg drop-shadow-md flex-col" ref={wrapperRef}>
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
                    <img src={userDetails?.pic ? `http://localhost:5000/assets/${userDetails?.pic}` : "/assets/avatar.jpg"} alt="" className="w-24 h-24 object-cover rounded-full" />
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
                  <span className="font-medium flex flex-row items-center gap-2 my-1 text-sm pr-12"><AlternateEmail /> {userDetails?.username}</span>
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


                    {/* {
                      userDetails?.username && <OutlineButton buttonStyle='text-sm p-1 self-end mr-5 min-w-max mb-1.5 ml-8' title="Personal Settings" onClick={() => {setShowPersonalEditBox(!setShowPersonalEditBox)}} />
                    }

                    {
                      userDetails?.username_b && <OutlineButton buttonStyle='text-sm p-1 self-end mr-5' title="Agent Settings" onClick={() => {setShowBusinessEditBox(!showBusinessEditBox)}} />
                    } */}
                  
                  <PrimaryButton buttonStyle='text-sm p-3 self-end mr-5 bg-red-500 mt-2' title="Logout" onClick={() => {localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"}} />
              </div> : <div></div>
              }
                    <Dialog open={showImageEditDialog} onClose={()=>setShowImageEditDialog(false)}>
                      <div className="flex flex-col gap-8 p-6 items-center justify-center bg-white rounded-xl">
                        <span className="font-medium text-lg">Change Profile Picture</span>
                        <div className="flex flex-row gap-5">
                          
                          <img src={(newProfile!=null && !vikramTry) ? URL.createObjectURL(newProfile) : userDetails?.pic ? `http://localhost:5000/assets/${userDetails?.pic}` : "/assets/avatar.jpg"} alt="" className="w-24 h-24 object-cover rounded-full" />

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