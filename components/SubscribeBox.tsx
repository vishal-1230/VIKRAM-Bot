import { useState } from "react"
import Button from "./SpecialButton"
import { toast } from "react-toastify"

function SubscribeBox(props: {boxStyle?: string}) {

  const [email, setEmail] = useState<string>("")

  async function submitForm() {
    const response = await fetch("https://vikram-69758-default-rtdb.asia-southeast1.firebasedatabase.app/subscribed.json", {
      method: "POST",
      body: JSON.stringify({
        email: email
      })
    })
    const data = await response.json()

    console.log(data)
    if (data.name) {
      setEmail("")
      toast.success("Subscribed to VIKRAM's Updates", {
        autoClose: 2000,
      });
    } else {
      toast.error('Error submitting form', {
        autoClose: 2000,
      });
    }
  }

  return (
    <div className={`flex flex-col xl:flex-row bg-white justify-between px-6 md:px-12 backdrop-blur-3xl max-w-[90%] md:max-w-fit self-center md:min-w-fit lg:min-w-0 py-10 md:py-14 rounded-lg gap-10 ${props.boxStyle}`} style={{boxShadow: "0px 2px 8px rgba(117, 131, 142, 0.08), 0px 20px 32px rgba(52, 60, 68, 0.16)"}}>
        <div className='flex flex-col text-black text-left max-w-full md:min-w-max'>
          <span className='font-bold text-2xl md:text-3xl flex-wrap'>Subscribe to our Updates!</span>
          <span className='font-light mt-1 md:mt-0 text-base md:text-lg'>Stay Informed with our newer developments.</span>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between border-[1px] border-[#eeeeee] py-2.5 pl-6 pr-3.5 rounded-lg w-[full] lg:min-w-max h-fit self-center' style={{boxShadow: "0px 0px 6px -2px #000"}}>
          <input type="text" placeholder="Enter your email" className='outline-none text-center md:text-left text-black w-48 md:w-min mt-2 md:mt-0 mr-2' value={email} onChange={(e)=>{setEmail(e.target.value)}} />
          <Button title="Sign Up" buttonStyle='mt-3 md:mt-0' Icon={()=>{return}} onClick={submitForm} />
        </div>
      </div>
  )
}

export default SubscribeBox