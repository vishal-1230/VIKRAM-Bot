import PrimaryButton from '@/components/PrimaryButton'
import SpecialText from '@/components/SpecialText'
import TrendingBots from '@/layouts/explore-more/TrendingBots'
import { ArrowLeft, ChatBubble } from '@mui/icons-material'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { RiInstagramFill, RiLinkedinBoxFill, RiLinkedinFill, RiLoader4Line, RiWhatsappFill } from 'react-icons/ri'
import { TbMessageShare } from 'react-icons/tb'

const inter = Inter({ subsets: ['latin']})

function Profile() {

    const router = useRouter()

    const userId = router.query.userId as string
    const [loggedIn, setLoggedIn] = useState<boolean>(false)

    const [userData, setUserData] = useState<any>(null)
    const [userDataLoading, setUserDataLoading] = useState<boolean>(false)

    async function getUserData() {
        setUserDataLoading(true)
        const res = await fetch(`https://server.vikrambots.in/gprofile/${userId}`)
        const data = await res.json()
        console.log(data)
        if (data.success === true) {
          setUserData(data.message)
        } else {
          setUserData(null)
          router.replace("/explore-bots")
        }
        setUserDataLoading(false)
    }

    useEffect(()=>{
        console.log("Finding for", userId)
        if (userId != undefined && userId != null) {
          getUserData()
          if (localStorage.getItem("temptoken") || localStorage.getItem("token")) {
              setLoggedIn(true)
          } else {
              setLoggedIn(false)
          }
        }
    }, [userId])

  return (
    userDataLoading ? <div className="flex justify-center items-center h-screen bg-bg-700">
        <RiLoader4Line className="animate-spin w-10 h-10 text-neutral-50" />
      </div>
      :
      userData ? 
      <div className={`${inter.className} bg-bg-700 text-neutral-50 p-5 md:p-8 flex flex-col gap-12 py-8`}>
          
          {/* <Link href="/explore-bots"> */}
              <span className="py-2 px-5 rounded-full flex items-center gap-1.5 w-fit bg-bg-300 bg-opacity-50 hover:bg-opacity-75 active:opacity-95 text-neutral-50 -mb-12 cursor-pointer" onClick={()=>{
                  router.back()
              }}>
                  <ArrowLeft className="inline-block" />
                  Go Back
              </span>
          {/* </Link> */}

          <div className="flex flex-col lg:flex-row gap-2 lg:gap-12 justify-start items-stretch p-0 lg:p-4 lg:pl-6 pt-8 md:pt-2">
              <img src={userData.pic ? `https://server.vikrambots.in/assets/${userData.pic}` : "/assets/avatar4.png"} alt="" className="w-[95vw] lg:w-96 aspect-square lg:h-96 object-cover rounded-none lg:rounded-full" />

              <div className="flex flex-col justify-between gap-1 py-2 px-1 md:px-0">
                  <SpecialText extra="text-4xl lg:text-5xl font-bold py-1">{userData.name ? userData.name : "Vikram Singh"}</SpecialText>
                  <span className="text-lg lg:text-xl text-gray-400 font-medium">@{userData.username ? userData.username : "Vikram324"}</span>
                  <span className="text-gray-400 mt-1 text-sm font-medium flex items-center">
                      <ChatBubble className="inline w-5 h-5" />&nbsp;
                      {userData.interactions ? userData.interactions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 0}
                  </span>

                  <Link href={loggedIn ? `/try-vikram-bots/${userId}` : `/quick-login?userId=${userId}`} className='mt-8 md:mt-auto'>
                    <PrimaryButton title='Chat' buttonStyle=' w-fit !py-1.5 text-base !px-5' showIcon Icon={()=>{
                        return <TbMessageShare className="inline w-5 h-5" />
                    }} />
                  </Link>

                  <span className="text-base lg:text-lg mt-1 text-gray-400 font-normal">
                      <a href={`mailto:${userData.email_id}`} className='font-semibold'>Email: </a>
                      {userData.email_id ? userData.email_id : "vikramsingh123@gmail.com"}
                  </span>
                  <span className="lg:mt-0.5 text-base lg:text-lg text-gray-400 font-normal flex gap-2 items-center">
                      <span className='font-semibold'>Connects: </span>
                      {
                        userData.socials ? userData.socials.length>0 ? userData.socials.map((social: any, index: number)=>{
                          return social.link!="" ? <a href={social.link} target="_blank" className='hover:text-blue-500' key={index}>
                            {
                              social.social === "linkedin" ? <RiLinkedinBoxFill className="inline-block w-7 h-7 cursor-pointer" /> : social.social === "instagram" ? <RiInstagramFill className="inline-block w-7 h-7 cursor-pointer" /> : social.social === "whatsapp" ? <RiWhatsappFill className="inline-block w-7 h-7 cursor-pointer" /> : null
                            }
                            </a>
                            :
                            null
                        })
                        : <span className='font-base text-sm lg:text-lg text-gray-500'>No Socials to Connect on</span>
                        : <span className='font-base text-sm lg:text-lg text-gray-500'>No Socials to Connect on</span>
                      }
                  </span>
                  <span className="mt-0.5 text-gray-400 font-normal text-base lg:text-lg md:pr-14">
                      {(userData.long_description && userData.long_description!="") ? userData.long_description : (userData.description && userData.description!="") ? userData.description : `This is a VIKRAM Bot created by ${userData.name ? userData.name : "Vikram Singh"} for the purpose of helping people like you ! Try out the Bot, if you like, it would be a great time to make your own Free VIKRAM Bot.`}
                  </span>
              </div>
          </div>

          <TrendingBots title='Other Trending Bots' className='pb-8' textClassName='ml-2' />
      </div>
      :
      null
  )
}

export default Profile