import { RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import { useState } from 'react'

function InputGroup(props: { className?: string, label?: string, type?: string, placeholder?: string, value?: string, onChange?: any, passwordAccessory?:React.ReactNode } = {type: "text"}) {

    const [showPassword, setShowPassword] = useState(false)

    {
        return (props.type != "password" ? props.type != "number" ?
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label}</span>
                <input type={props.type} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={props.value} onChange={props.onChange} />
            </div>
            :
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label}</span>
                {/* Adding list of countries to choose from phone number codes in the following div */}
                {/* <div className="flex relative items-center"> */}
                    {/* <div className="flex items-center border-[1px] border-[#DDD6D6] rounded-md">
                        <span className="text-sm text-black p-2">+91</span>
                        <div className="flex items-center justify-center border-l-[1px] border-[#DDD6D6] h-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M10 0a10 10 0 100 20 10 10 0 000-20zM1 10a9 9 0 1118 0 9 9 0 01-18 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div> */}
                    <input type={props.type} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={props.value} onChange={props.onChange} />
                {/* </div> */}
            </div>
            :
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label}</span>
                <div className="flex relative items-center">
                    <input type={showPassword ? "text" : "password"} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md grow" value={props.value} onChange={props.onChange} />
                    {
                        showPassword ?
                        <RemoveRedEyeOutlined className='cursor-pointer w-5 text-bg-50 absolute right-3 z-10' onClick={() => setShowPassword(!showPassword)} />
                        :
                        <VisibilityOffOutlined className='cursor-pointer w-5 text-bg-50 absolute right-3 z-10' onClick={() => setShowPassword(!showPassword)} />
                    }
                </div>
                {props.passwordAccessory}
            </div>
        )
    }
}

export default InputGroup