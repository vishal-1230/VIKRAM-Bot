import { AccountCircleOutlined, BookmarkBorderOutlined, BorderColorOutlined, ContentCopyRounded, Person2Outlined, ThumbDownAltOutlined, ThumbUpAltOutlined } from "@mui/icons-material"
import Image from "next/image"

function Message({ children, mode, sender } : {children: string, mode:string, sender: string}) {
  return (
    <div className={`flex flex-col md:flex-row duration-200 gap-8 items-start md:items-center w-full h-fit px-7 md:px-28 py-8 ${sender === "user" ? mode === "night" ? "bg-bg-800" : "bg-white" : mode === "night" ? "bg-bg-700" : "bg-gray-3"}`}>
        {
            sender === "user" || sender === "User" ? (
                <AccountCircleOutlined className={`w-8 h-8 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-bg-50"}`} />
            ) : (
                <Image src={mode === "night" ? "/assets/navlogo1.png" : "/assets/botBlack.png"} alt="VIKRAM Bot" className="duration-200" width={40} height={40} />
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
              <BorderColorOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
            ) : (
              <div className="flex gap-2">
                <ThumbUpAltOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
                <ThumbDownAltOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
                <ContentCopyRounded className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
              </div>
            )
          }

          <BookmarkBorderOutlined className={`w-5 h-5 duration-200 ${mode === "night" ? "fill-neutral-500" : "fill-neutral-900"}`} />
        </div>
    </div>
  )
}

export default Message