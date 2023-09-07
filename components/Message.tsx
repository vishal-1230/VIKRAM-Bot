import { AccountCircleOutlined, BookmarkBorderOutlined, BorderColorOutlined, ContentCopyRounded, Person2Outlined, ThumbDownAltOutlined, ThumbDownAltSharp, ThumbUpAlt, ThumbUpAltOutlined, ThumbUpAltSharp, ThumbUpOffAlt } from "@mui/icons-material"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Parser from "html-react-parser"

function Message({ children, type, images, mode, sender, botIcon } : {children?: string, type?: "text" | "image", images?: string[], mode:string, sender: string, botIcon?: string}) {

  const [liked, setLiked] = useState<boolean>(false)
  const [disliked, setDisliked] = useState<boolean>(false)

  const [formattedMessage, setFormattedMessage] = useState<any>("")

  useEffect(()=>{
    if (children != null || children != undefined) {
      console.log("message rendered", children)
  
      // setFormattedMessage(Parser(children))
      // linkifying the message
      if (children === "Loading...") {
        setFormattedMessage(children)
        return
      } else if (children == null) {
        setFormattedMessage(children)
        return
      }
      let linkifiedMessage = children.replace(/(https?:\/\/[^\s]+)/g, ' <a href="$1" class="font-semibold hover:text-gradient-blue" target="_blank">$1</a>')
      console.log(linkifiedMessage)
      setFormattedMessage(linkifiedMessage)
      // console.log(formattedMessage)
    }
  }, [children])

  // const CC = dynamic(() => import("react-copy-to-clipboard").then(mod => mod.CopyToClipboard), { ssr: false })
  const [showImage, setShowImage] = useState<boolean>(false)
  const [image, setImage] = useState<string>("")

  return (
    <div className={`flex flex-col md:flex-row duration-200 gap-4 md:gap-8 items-start md:items-center w-full h-fit px-7 md:px-28 py-5 md:py-8 ${sender === "user" ? mode === "night" ? "bg-bg-800" : "bg-white" : mode === "night" ? "bg-bg-700" : "bg-gray-3"}`}>
      {
        showImage ?
        <div className="fixed top-0 left-0 h-screen w-screen z-[10000000] bg-[rgba(0,0,0,0.4)]" onClick={()=>{
          setShowImage(false)
        }} onMouseOver={()=>{
            setShowImage(true)
        }} onMouseOut={()=>{
            setShowImage(false)
        }}>
          <img src={image} alt="" className="fixed rounded-lg shadow-lg z-[1000000] top-1/2 left-1/2 -translate-x-1/2 mt-5 -translate-y-1/2 h-[75vh]" onMouseOver={()=>{
            setShowImage(true)
          }} onClick={()=>{
            setShowImage(false)
          }} onMouseOut={()=>{
            setShowImage(false)
          }} />
        </div>
        :
        null
      }
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
        <div className={`duration-200 ${mode === "night" ? "text-neutral-500" : "text-bg-50"} grow`}>
          {
            children != "Loading..."
            ? type === "image" ? (
              <div className="flex flex-row items-start flex-wrap gap-2">
                {
                  images && images.length > 0 ? images.map((image, index) => {
                    return (
                      <img
                        src={`https://server.vikrambots.in/assets/${image}`}
                        alt=""
                        className="h-48 rounded-xl object-cover"
                        key={index}
                        onMouseOver={()=>{
                            setImage(`https://server.vikrambots.in/assets/${image}`)
                            setShowImage(true)
                          // setShowImage(true)
                        }}
                        onMouseOut={()=>{
                          setShowImage(false)
                        }}
                      />
                    )
                  }) : null
                }
              </div>
            ) :
            <div dangerouslySetInnerHTML={{ __html: formattedMessage}} className="whitespace-pre-wrap"></div>
            :
            <img src="/assets/chatLoading2.svg" alt="" className="w-10 h-10 self-center" />
          }
        </div>

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
                <ContentCopyRounded className={`w-5 h-5 cursor-pointer duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} onClick={() => {children ? navigator.clipboard.writeText(children) : null; toast.success("Copied to Clipboard!", {autoClose: 1000, position: "bottom-right"})}} />
              </div>
            )
          }

          {/* <BookmarkBorderOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} /> */}
        </div>
    </div>
  )
}


export default Message