import { ChatBubble } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsEye, BsHeart, BsHeartFill } from 'react-icons/bs'
import { HiEye } from 'react-icons/hi'

function BotCard(props: BotCardProps) {

  const [liked, setLiked] = React.useState(props.liked || false)

  async function likeBot(botId: string) {
    const res = await fetch(`https://server.vikrambots.in/add-fav/${botId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token") || ""
      }
    })
    const data = await res.json()
    console.log(data)
  }

  console.log("image", props)

  return (
    <Link href={`http://localhost:3000/try-vikram-bots/${props.userName}`}>
    <div className="flex flex-col items-center p-6 pb-3 w-[195px] min-w-[195px] h-full max-w-fit bg-neutral-300 hover:bg-neutral-200 shadow-bg-300 cursor-pointer select-none hover:shadow-2xl hover:shadow-bg-300 hover:scale-105 drop-shadow-lg rounded-lg shadow-lg">
      {
        liked ? <BsHeartFill className="text-red-500 text-lg self-end cursor-pointer" onClick={() => setLiked(!liked)} /> : <BsHeart className="text-red-500 text-lg self-end cursor-pointer" onClick={() => {setLiked(!liked); likeBot(props.userName)}} />
      }
      {/* <BsHeart className="text-red-500 text-lg self-end cursor-pointer" /> */}
      <img src={!props.logo.endsWith("undefined") ? props.logo : "/assets/avatar.jpg"} alt="Bot Logo" className="rounded-full self-center object-cover aspect-square w-[90%]" />
      <span className="text-bg-900 text-lg font-semibold mt-3 text-center">
        {props.name}
      </span>
      <span className="text-bg-50 text-sm font-medium text-center">
        @{props.userName}
      </span>
      <span className="text-bg-700 text-justify text-sm font-normal mt-2">
        {props.description==="" ? "No description's there" : props.description}
      </span>
      <span className="text-xs text-gray-400 hover:text-gray-500 pt-2 self-end mt-auto">
        <ChatBubble className="inline text-lg" />&nbsp;
        {/* formatting with commas */}
        {props.interactions.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      </span>
    </div>
    </Link>
  )
}

interface BotCardProps {
    logo: string,
    name: string,
    userName: string,
    description: string,
    likes: number,
    interactions: number,
    liked?: boolean,
}

BotCard.defaultProps = {
    logo: "/assets/avatar.jpg",
    name: "Bot Name",
    userName: "Vishal2",
    description: "This is a one-liner bot description",
    likes: 0,
    interactions: 124,
}

export default BotCard