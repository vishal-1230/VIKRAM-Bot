import { Person2Outlined } from "@mui/icons-material"
import Image from "next/image"

function Message({ children, sender } : {children: string, sender: string}) {
  return (
    <div className={`flex flex-row gap-8 w-full h-fit px-28 py-12 ${sender === "user" ? "bg-white" : "bg-gray-3"}`}>
        {
            sender === "user" ? (
                <Person2Outlined className="w-8 h-8 fill-neutral-700" />
            ) : (
                <Image src="/assets/navLogo1.png" alt="VIKRAM Bot" width={40} height={40} />
            )
        }
        
    </div>
  )
}

export default Message