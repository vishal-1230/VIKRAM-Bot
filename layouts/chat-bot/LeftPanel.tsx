import { BookmarkBorderOutlined, DarkModeOutlined, LaunchOutlined, LightModeOutlined, LogoutOutlined, PersonOutlineOutlined, UpdateOutlined } from "@mui/icons-material"

function LeftPanel(props: {mode: string, setMode: any}) {

    const mode = props.mode
    const setMode = props.setMode

  return (
    <div className="flex-col absolute md:relative hidden md:flex justify-between z-10 py-5 bg-bg-900 px-6 pr-3 mt-20 max-w-[18rem]">
        <div className="flex flex-col gap-8 overflow-y-scroll overflow-x-clip">

            <div className="flex flex-col gap-4">
                
                <span className="text-sm font-semibold text-white flex gap-2.5 flex-row items-center mb-1">
                    <UpdateOutlined />
                    Your history
                </span>

                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Lorem ipsum or sit amet cohabsckj</span>
                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Lorem ipsum or sit amet cohabsckj</span>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-white flex gap-2.5 flex-row items-center mb-1">
                    <BookmarkBorderOutlined />
                    Your saved searches
                </span>

                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Lorem ipsum or sit amet cohabsckj</span>
                <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-transparent min-w-max overflow-clip">Lorem ipsum or sit amet cohabsckj</span>

            </div>

            <div className="flex flex-col gap-4">
                <span className="text-sm font-semibold text-white flex gap-2.5 flex-row items-center mb-1">
                    <PersonOutlineOutlined />
                    Mode
                </span>

                <div className="flex flex-row gap-3 items-center">
                    <input type="radio" name="mode" id="mode" className="min-h-8 max-h-8 min-w-8 max-w-8 bg-bg-900 fill-bg-900" />
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-medium text-sm">
                            Normal Mode
                        </span>
                        <span className="text-xs text-neutral-700">
                            Lorem ipsum dolor sit amet consectetur. Lectus nisl se.
                        </span>
                    </div>
                </div>

                <div className="flex flex-row gap-3 items-center">
                    <input type="radio" name="mode" id="mode" className="min-h-8 max-h-8 min-w-8 max-w-8" />
                    <div className="flex flex-col gap-1">
                        <span className="text-white font-medium text-sm">
                            Professional Mode
                        </span>
                        <span className="text-xs text-neutral-700">
                            Lorem ipsum dolor sit amet consectetur. Lectus nisl se.
                        </span>
                    </div>
                </div>

            </div>
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

            <span className="font-medium text-sm text-neutral-500 flex items-center gap-2.5">
                <LogoutOutlined />
                Logout
            </span>

        </div>

    </div>
  )
}

export default LeftPanel