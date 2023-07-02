import { RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import { useState } from 'react'

function InputGroup(props: InputGroupProps) {

    const [showPassword, setShowPassword] = useState(false)

    const [countrySelectedForNumber, setcountrySelectedForNumber] = useState(undefined)

    {
        return (props.type != "password" ? props.type != "number" ? props.type != "description" ? props.type!="options" ? props.type != "username" ?
            // Normal Text Input
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label} {props.required && <span className='text-red-500'>*</span>}</span>
                <input type={props.type} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={props.value} onChange={(e)=>props.onChange(e.target.value)} />
                <span className="text-xs font-medium text-red-500">
                  {props?.hintAccessory!=undefined && props?.hintAccessory()}
                </span>
            </div>
            :
            // Username Input
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label} {props.required && <span className='text-red-500'>*</span>}</span>
                <input type={props.type} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={props.value} onChange={(e)=>{if(!e.target.value.endsWith(" ")){console.log(e.target.value); props.onChange(e.target.value.charAt(0).toUpperCase()+e.target.value.substring(1, e.target.value.length))}}} />
                {props?.hintAccessory!=undefined && props?.hintAccessory()}
            </div>
            :
            // Options/Radio Input
            <div className="flex gap-2 cursor-pointer" onClick={props?.radioOptions?.onChange}>
                  <input type="radio" checked={props.radioOptions?.checked} name={props.radioOptions?.name} id={props.radioOptions?.title} className='w-4 border-2 outline-2 border-black outline-black p-1 text-sm duration-300' />
                  <div className="flex flex-col gap-1">
                    <span className="text-neutral-900 font-medium text-sm">{props.radioOptions?.title}</span>
                    <span className="text-xs text-neutral-700 font-medium flex-wrap max-w-[80vw] md:max-w-[30vw] text-justify">{props.radioOptions?.subtext}</span>
                  </div>
            </div>
            :
            // Textarea Input
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label} {props.required && <span className='text-red-500'>*</span>}</span>
                <textarea placeholder={props.placeholder} rows={props.textareaRows} cols={props.textareaCols} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={props.value} onChange={(e)=>props.onChange(e.target.value)} />
            </div>
            :
            // Number Input with Country Code
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label} {props.required && <span className='text-red-500'>*</span>}</span>
                <div className="flex relative items-center border-[1px] border-[#DDD6D6] rounded-md">
                    <CustomDropdown2 />
                    <input type={props.type} minLength={10} maxLength={12} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none" value={props.value} onChange={(e)=>props.onChange(e.target.value)} />
                </div>
                {props?.hintAccessory!=undefined && props?.hintAccessory()}
            </div>
            :
            // Password Input
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label} {props.required && <span className='text-red-500'>*</span>}</span>
                <div className="flex relative items-center">
                    <input type={showPassword ? "text" : "password"} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md grow" value={props.value} onChange={(e)=>props.onChange(e.target.value)} />
                    {
                        showPassword ?
                        <RemoveRedEyeOutlined className='cursor-pointer w-5 text-bg-50 absolute right-3 z-10' onClick={() => setShowPassword(!showPassword)} />
                        :
                        <VisibilityOffOutlined className='cursor-pointer w-5 text-bg-50 absolute right-3 z-10' onClick={() => setShowPassword(!showPassword)} />
                    }
                </div>
                {/* {props.passwordAccessory} */}
                <span className="text-xs font-medium text-red-500">
                  {props?.hintAccessory!=undefined && props?.hintAccessory()}
                </span>
            </div>
        )
    }
}

const countryOptions = [
    { name: 'India', code: '+91', logoUrl: 'https://seeklogo.com/images/I/india-flag-logo-3522C6780F-seeklogo.com.png' },
    { name: 'United States', code: '+1', logoUrl: 'https://w7.pngwing.com/pngs/666/76/png-transparent-flag-of-the-united-states-national-flag-usa-flag-flag-logo-united-states.png' },
    { name: 'United Kingdom', code: '+44', logoUrl: 'https://w7.pngwing.com/pngs/599/178/png-transparent-flag-of-the-united-kingdom-flag-of-england-flags-of-the-world-united-kingdom-flag-logo-united-kingdom.png' },
    // Add more country options with their respective logo URLs
  ];
  
  const CustomDropdown2 = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<{name: string, code:string, logoUrl: string}>(countryOptions[0]);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionClick = (option:{name: string, code:string, logoUrl: string}) => {
      setSelectedOption(option);
      setIsOpen(false);
    };
  
    return (
      <div className="relative select-none">
        <div
          className="relative flex items-center justify-between w-full px-3 ml-1 pr-1 py-2 bg-white cursor-pointer"
          onClick={toggleDropdown}
        >
          {selectedOption ? (
            <>
              <img className="w-5 h-5 mr-1 rounded-full object-cover" src={selectedOption.logoUrl} alt={selectedOption.name} />
              {/* <span>{selectedOption.name}</span> */}
            </>
          ) : (
            <span>Select a country</span>
          )}
          <svg
            className={`w-4 h-4 text-gray-600 duration-200 ${isOpen ? 'transform -rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        {isOpen && (
          <ul className="absolute z-10 w-max py-2 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg">
            {countryOptions.map((option, index) => (
              <li
                key={index}
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option)}
              >
                <img className="w-5 h-5 mr-2 rounded-full object-cover" src={option.logoUrl} alt={option.code} />
                <span>{option.code}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  interface InputGroupProps {
    className?: string,
    label?: string, type?: "password" | "number" | "description" | "username" | "text" | "options",
    placeholder?: string,
    value?: string,
    onChange?: any,
    hintAccessory?:() => string | React.ReactNode | boolean,
    passwordAccessory?:React.ReactNode,
    textareaRows?:number,
    textareaCols?:number,
    radioOptions?:{name:string, title:string, subtext?:string, onClick?:any, onChange?:any, checked?:boolean},
    required?: boolean
  }
  InputGroup.defaultProps = {
    className: '',
    type: 'text',
    placeholder: 'Input Area',
    value: '',
    onChange: () => {},
    label: 'Input Label',
    textareaRows: 4,
    passwordAccessory: null,
    hintAccessory: null,
    required: false
  };
  

export default InputGroup