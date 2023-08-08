import { AccountCircleOutlined, BookmarkBorderOutlined, BorderColorOutlined, ContentCopyRounded, Person2Outlined, ThumbDownAltOutlined, ThumbDownAltSharp, ThumbUpAlt, ThumbUpAltOutlined, ThumbUpAltSharp, ThumbUpOffAlt } from "@mui/icons-material"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';2

function Message({ children, mode, sender, botIcon } : {children: string, mode:string, sender: string, botIcon?: string}) {

  const [liked, setLiked] = useState<boolean>(false)
  const [disliked, setDisliked] = useState<boolean>(false)

  // const CC = dynamic(() => import("react-copy-to-clipboard").then(mod => mod.CopyToClipboard), { ssr: false })


  return (
    <div className={`flex flex-col md:flex-row duration-200 gap-4 md:gap-8 items-start md:items-center w-full h-fit px-7 md:px-28 py-5 md:py-8 ${sender === "user" ? mode === "night" ? "bg-bg-800" : "bg-white" : mode === "night" ? "bg-bg-700" : "bg-gray-3"}`}>
      {/* <ToastContainer autoClose={1000} position="bottom-right" /> */}
        {
            sender === "user" || sender === "User" ? (
                <AccountCircleOutlined className={`w-9 h-9 min-w-9 min-h-9 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-bg-50"}`} />
            ) : (
              botIcon ?
                <img src={botIcon}  alt="VIKRAM Bot" className="duration-200 rounded-full object-cover" width={40} height={40} /> :
                <Image src={ mode === "night" ? "/assets/navlogo1.png" : "/assets/botBlack.png"} alt="VIKRAM Bot" className="duration-200" width={40} height={40} />
            )
        }
        <span className={`duration-200 ${mode === "night" ? "text-neutral-500" : "text-bg-50"} grow`}>
          {
            children != "Loading..." ? children : <img src="/assets/chatLoading2.svg" alt="" className="w-10 h-10 self-center" />
          }
        </span>

        <div className="flex gap-2">
          {
            sender === "user" || sender === "User" ? (
              // <BorderColorOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
                // <ContentCopyRounded className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={() => {navigator.clipboard.writeText(children); toast.success("Copied to Clipboard!")}} />
                  null
                ) : children === "Loading..." ? null : (
              <div className="flex gap-2">{
                liked ? (
                  <ThumbUpAltSharp className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-primary-500" : "fill-primary-900"}`} onClick={()=>{setLiked(false)}} />
                ) : (
                  <ThumbUpAltOutlined className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={()=>{setLiked(true); setDisliked(false)}} />
                )
              }
              {
                disliked ? (
                  <ThumbDownAltSharp className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-primary-500" : "fill-primary-900"}`} onClick={()=>{setDisliked(false)}} />
                ) : (
                  <ThumbDownAltOutlined className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={()=>{setDisliked(true); setLiked(false)}} />
                )
              }
                <ContentCopyRounded className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={() => {navigator.clipboard.writeText(children); toast.success("Copied to Clipboard!", {autoClose: 1000, position: "bottom-right"})}} />
              </div>
            )
          }

          {/* <BookmarkBorderOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} /> */}
        </div>
    </div>
  )
}


export default Message