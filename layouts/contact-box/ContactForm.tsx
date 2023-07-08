import InputGroup from "@/components/InputGroup"
import PrimaryButton from "@/components/PrimaryButton"
import SpecialText from "@/components/SpecialText"
import { Mail, MailOutline } from "@mui/icons-material"
import { Orbitron } from "next/font/google"
import Link from "next/link"
import { useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

const orbitron = Orbitron({subsets: ["latin"]})

function ContactForm(props: {className?: string, showTitle: boolean, showDescription?: boolean, showMail?: boolean}) {

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  async function submitForm() {
    const response = await fetch("https://vikram-69758-default-rtdb.asia-southeast1.firebasedatabase.app/queries.json", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        description: description
      })
    })
    const data = await response.json()

    console.log(data)
    if (data.name) {
      toast.success('Form submitted successfully', {
        autoClose: 2000,
      });
      setName("")
      setEmail("")
      setDescription("")
    } else {
      toast.error('Error submitting form', {
        autoClose: 2000,
      });
    }
  }

  return (
    <div className={`flex flex-row px-5 md:px-24 py-8 md:py-20 bg-white w-screen relative ${props.className}`}>
      <ToastContainer position="top-right" autoClose={2000} />
        <div className="flex flex-col grow justify-center px-3 md:px-0 z-10">
            
            {props.showTitle && <span className={`font-bold text-4xl md:text-5xl text-bg-900 ${orbitron.className}`}>Get in <SpecialText extra="text-4xl md:text-5xl font-bold">Touch</SpecialText></span>}

            {props.showDescription && <span className="mt-5 text-bg-50">Got questions or ideas? We'd love to chat! Hit us up through our contact form or email, and we'll get back to you ASAP.</span>}

            {props.showMail && <Link href="mailto:info@arthlex.com" className='text-lg md:text-xl font-medium text-neutral-500 mt-5'><MailOutline className='fill-neutral-500 w-8 h-6' />Email us at: <span className='text-primary-500'>info@arthlex.com</span></Link>}

            <InputGroup label="Name" type="text" required placeholder="Enter your name" className="mt-5" value={name} onChange={setName} />

            <InputGroup label="Email" type="text" required placeholder="Enter your email" className="mt-4" value={email} onChange={setEmail} />

            <InputGroup label="Query Description" required textareaRows={6} type="description" placeholder="Ask us your Query in Brief" className="mt-4" value={description} onChange={setDescription} />

            <PrimaryButton title="Submit" buttonStyle="mt-5 w-full z-10" onClick={submitForm} />

        </div>

        <div className="absolute top-0 left-0 flex flex-col z-0">
          <img src="/assets/contact-top-left.svg" alt="" />
          <img src="/assets/contact-top-left-2.svg" alt="" className="w-fit self-center mr-3 -mt-3.5" />
        </div>
        
        <img src="/assets/contact-bottom-left.svg" alt="" className="absolute bottom-0 left-0 z-0" />

        <div className="flex-row-reverse justify-center items-center ml-16 md:ml-32 lg:ml-48 hidden md:flex">
          <img src="/assets/contact-top-right.svg" alt="" className="absolute top-0 md:w-96 lg:w-[420px] xl:w-fit right-0 z-0" />
          <img src="/assets/contact-man.svg" alt="" className=" md:mb-32 xl:w-80 z-10 hidden md:block" />
          <img src="/assets/contact-top-right-2.svg" alt="" className="mt-48" />
        </div>

    </div>
  )
}

ContactForm.defaultProps = {
    showTitle: true,
    showDescription: true,
    showMail: true
}

export default ContactForm