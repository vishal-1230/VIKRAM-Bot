import { BookmarkBorderOutlined, DarkModeOutlined, LaunchOutlined, LightModeOutlined, LogoutOutlined, Notifications, NotificationsOutlined, PersonOutlineOutlined, UpdateOutlined } from "@mui/icons-material"
import { useRouter } from "next/router"
import { useState } from "react"

function LeftPanel(props: {mode: string, setMode: any}) {

    const router = useRouter()

    const mode = props.mode
    const setMode = props.setMode

    const [notifications, setNotifications] = useState<string[]>([])

  return (
    <div className="flex-col absolute md:relative hidden w-64 md:flex justify-between z-10 py-5 bg-bg-900 px-6 pr-3 mt-20 max-w-[16rem]">
        <div className="flex flex-col gap-8 overflow-y-scroll overflow-x-clip">

            <div className="flex flex-col gap-4 min-w-max">
                
                <span className="text-sm font-semibold text-white flex gap-2.5 flex-row items-center mb-1">
                    <NotificationsOutlined />
                    Your Notifications
                </span>
                {
                    notifications.length === 0 ? (
                        <span className="text-sm text-gray-300 flex-wrap">No new notifications</span>
                    ) : (
                        notifications.map((notification, index) => {
                            return (
                                <span key={index} className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#aaa] flex-wrap">{notification}</span>
                            )
                        })
                    )
                }
                {/* <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#aaa] flex-wrap">Lorem ipsum or sit amet cohabsckj Right man?</span> */}
                {/* <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#aaa] flex-wrap">Lorem ipsum or sit amet cohabsckj Right man?</span> */}
            </div>

            {/* <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-white flex gap-2.5 flex-row items-center mb-1">
                    <UpdateOutlined />
                    Your History
                </span>

                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Lorem ipsum or sit amet cohabsckj </span>
                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Lorem ipsum or sit amet cohabsckj </span>

            </div> */}
        </div>

        <div className="flex flex-col gap-3 mt-8 pt-4 border-t-2 border-bg-500 pr-2">
            
            <span className="font-medium text-sm select-none text-neutral-500 flex items-center gap-2.5 cursor-pointer duration-200" onClick={()=>{setMode(mode === "day" ? "night" : "day")}}>
                {
                    mode === "day" ? ( <DarkModeOutlined /> ) : (<LightModeOutlined />)
                }
                {/* <DarkModeOutlined /> */}
                {
                    mode === "day" ? ( "Day Mode" ) : ("Night Mode")
                }
                {/* Dark Mode */}
            </span>

            <span className="font-medium text-sm text-neutral-500 flex items-center gap-2.5">
                <LaunchOutlined />
                Updates & FAQ
            </span>

            <span className="font-medium text-sm text-neutral-500 flex cursor-pointer items-center gap-2.5" onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("user"); router.replace("/")}}>
                <LogoutOutlined />
                Logout
            </span>

        </div>

    </div>
  )
}

export default LeftPanel