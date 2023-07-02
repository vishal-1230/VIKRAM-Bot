import { KeyboardArrowDownOutlined } from '@mui/icons-material'
import React from 'react'

function Dropdown(props: {title?: string, list: {text: string, icon?:React.ReactDOM, onClick?:any}[], className?: string, selectedChatCategory: string, setSelectedChatCategory?: any}) {

    const [open, setOpen] = React.useState(false)

    const toggle = () => setOpen(!open)

    const cats: {[cat: string]: string} =  {
        "personal": "My Personal Bot",
        "personaltraining": "My Personal Bot (Training)",
        "business": "My Business Bot (Training)",
        "initiator": "Connect to someone's bot",
        "business_initiator": "Connect to a Business",
        "none": "None",
        "News": "News",
        "Weather": "Weather",
        "IMDB": "IMDB",
        "Google": "Google",
        "YouTube": "YouTube"
    }

    const [selected, setSelected] = React.useState(cats[props.selectedChatCategory] ? cats[props.selectedChatCategory] : props.list[0].text)

  return (
    <div className={`relative inline-block text-left z-50 ${props?.className}`}>
        {
            props.title && <span className="text-white font-semibold text-sm">{props?.title}:</span>
        }
        <div className={props.title && "mt-1.5"}>
            <button type="button" onClick={()=>{setOpen(!open)}} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium duration-200 text-gray-700 hover:bg-bg-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-bg-700">
                {selected}
                <KeyboardArrowDownOutlined className="-mr-1 ml-2 #000 w-5 h-5 stroke-2" aria-hidden="true" />
            </button>   
        </div>
        {/* { */}
            {/* // open ? ( */}
                <div className={`mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${open ? "absolute" : "hidden"}`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        {
                            props.list.map((item, index) => {
                                return (
                                    <button key={index} onClick={item.onClick ? ()=>{item.onClick(); setSelected(item.text); setOpen(!open)} : () => setSelected(item.text)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem">{item.text}</button>
                                )
                            })
                        }
                    </div>
                </div>
            {/* ) : null */}
        {/* } */}
    </div>
  )
}

export default Dropdown