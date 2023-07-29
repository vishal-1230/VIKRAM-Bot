import { BookmarkBorderOutlined, CancelOutlined, DarkModeOutlined, LaunchOutlined, LightModeOutlined, LogoutOutlined, Menu, MenuOpenOutlined, Notifications, NotificationsOutlined, PersonOutlineOutlined, Settings, SettingsApplications, SettingsOutlined, SettingsRounded, SettingsSuggest, UpdateOutlined } from "@mui/icons-material"
import { Tooltip } from "@mui/material"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

function LeftPanel(props: {
    mode: string,
    setMode: any,
    showSettingsInMobile: boolean,
    setShowSettingsInMobile: any
}) {

    const router = useRouter()

    const mode = props.mode
    const setMode = props.setMode

    const [notifications, setNotifications] = useState<string[]>([])
    const [notificationsLoading, setNotificationsLoading] = useState<boolean>(false)

    const [userDetails, setUserDetails] = useState<any>({})

    const [showHistory, setShowHistory] = useState<boolean>(false)
    const [historyLoading, setHistoryLoading] = useState<boolean>(false)
    const [history, setHistory] = useState<string[]>([])

    const [personal, setPersonal] = useState<boolean>(false)
    const [business, setBusiness] = useState<boolean>(false)

    const [showSettingsInMobile, setShowSettingsInMobile] = [props.showSettingsInMobile, props.setShowSettingsInMobile]

    async function getChats() {
        setHistoryLoading(true)
        const res = await fetch("https://server.vikrambots.in/history", {
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
        const data = await res.json()
        setHistoryLoading(false)
        console.log("Data", data)
        if (data.success) {
            setHistory(data.message)
        }
    }

    async function userInfo () {
        const res = await fetch("https://server.vikrambots.in/ginfo", {
            headers: {
                "x-access-token": localStorage.getItem("token")!
            }
        })
        const data = await res.json()
        console.log(data)
        if (data.username != data.username_b){
            setShowHistory(true)
            setPersonal(true)
            getChats()
        } else {
            setShowHistory(false)
            setPersonal(false)
        }
        if (data.username_b != "None") {
            setBusiness(true)
        } else {
            setBusiness(false)
        }
        setUserDetails(data)
    }
    // const [showSettingsInMobile, setShowSettingsInMobile] =  [showSettings().showSettingsMenu, showSettings().setShowSettingsMenu]

    useEffect(()=>{
        if (localStorage.getItem("token")) {
            userInfo()
        } else {
            router.replace("/auth/login")
        }  
      }, [])

  return (
    <div className={`flex-col z-[10000] ${showSettingsInMobile ? "" : "hidden"} absolute h-screen md:h-auto md:relative w-screen md:w-64 md:flex justify-between md:z-10 pt-2 md:pt-5 py-5 px-6 pr-3 mt-20 md:max-w-[16rem] ${mode === "day" ? "bg-neutral-100 !text-bg-900" : "bg-bg-900"}`}>
        <CancelOutlined className="block md:!hidden text-neutral-50 fill-neutral-50 cursor-pointer absolute top-3 right-5 text-xl" onClick={()=>{setShowSettingsInMobile(false)}} />
        <div className="flex flex-col gap-8 overflow-y-scroll overflow-x-clip">

            <div className="flex flex-col gap-4 min-w-max">
                
            </div>

        <div></div>
                <span>alksjd</span>
        </div>

        <div className="flex flex-col gap-3 mt-8 pt-4 border-t-2 border-bg-500 pr-2">
            
            <span className={`font-medium text-sm select-none ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5 cursor-pointer duration-200`} onClick={()=>{setMode(mode === "day" ? "night" : "day")}}>
                {
                    mode === "day" ? ( <DarkModeOutlined /> ) : (<LightModeOutlined />)
                }
                {/* <DarkModeOutlined /> */}
                {
                    mode === "day" ? ( "Day Mode" ) : ("Night Mode")
                }
                {/* Dark Mode */}
            </span>

            <Link href="/#faqs" className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex items-center gap-2.5`}>
                <LaunchOutlined />
                FAQs
            </Link>

            <span className={`font-medium text-sm ${mode === "day" ? "text-bg-900" :"text-white"} flex cursor-pointer items-center gap-2.5`} onClick={()=>{localStorage.removeItem("token"); localStorage.removeItem("user"); window.location.href = "/"}}>
                <LogoutOutlined />
                Logout
            </span>

        </div>

    </div>
  )
}

export default LeftPanel