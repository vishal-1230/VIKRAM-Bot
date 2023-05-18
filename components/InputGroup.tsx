import { RemoveRedEyeOutlined, VisibilityOffOutlined } from '@mui/icons-material'
import { useState } from 'react'

function InputGroup(props: { className?: string, label?: string, type?: string, placeholder?: string, value?: string, onChange?: any, passwordAccessory?:React.ReactNode } = {type: "text"}) {

    const [showPassword, setShowPassword] = useState(false)

    const [countrySelectedForNumber, setcountrySelectedForNumber] = useState(undefined)

    {
        return (props.type != "password" ? props.type != "number" ?
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label}</span>
                <input type={props.type} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none border-[1px] border-[#DDD6D6] rounded-md" value={props.value} onChange={props.onChange} />
            </div>
            :
            <div className={`flex flex-col mt-4 gap-1 ${props.className}`}>
                <span className="font-medium text-bg-50">{props.label}</span>
                {/* Adding list of countries to choose from phone number codes like india +91, us +1 and so on in the following div */}
                <div className="flex relative items-center border-[1px] border-[#DDD6D6] rounded-md">
                    {/* <div className="relative">
                        <select className="appearance-none py-2 px-4 pr-8 bg-transparent rounded-lg text-gray-700 leading-tight focus:outline-none focus:border-blue-500">
                            <option className='h-10 w-10'>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M10 12l-6-6h12l-6 6z" />
                            </svg>
                        </div>
                    </div> */}
                    <CustomDropdown2 />
                    <input type={props.type} minLength={10} maxLength={12} placeholder={props.placeholder} className="text-sm text-black p-2 outline-none" value={props.value} onChange={props.onChange} />
                </div>
                
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
  

export default InputGroup