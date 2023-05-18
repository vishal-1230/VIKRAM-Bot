import InputGroup from "@/components/InputGroup"
import PrimaryButton from "@/components/PrimaryButton"
import SpecialText from "@/components/SpecialText"
import { Mail, MailOutline } from "@mui/icons-material"
import { Orbitron } from "next/font/google"
import Link from "next/link"

const orbitron = Orbitron({subsets: ["latin"]})

function ContactForm(props: {className?: string, showTitle: boolean, showDescription?: boolean, showMail?: boolean}) {
  return (
    <div className={`flex flex-row px-24 py-24 pb-12 bg-white ${props.className}`}>
        <div className="flex flex-col">
            
            {props.showTitle && <span className={`font-bold text-5xl text-bg-900 ${orbitron.className}`}>Get in <SpecialText extra="text-5xl font-bold">Touch</SpecialText></span>}

            {props.showDescription && <span className="mt-5 text-bg-50">Got questions or ideas? We'd love to chat! Hit us up through our contact form or email, and we'll get back to you ASAP.</span>}

            {props.showMail && <Link href="mailto:mail@vikram.ai" className='text-xl font-medium text-neutral-500 mt-5'><MailOutline className='fill-neutral-500 w-8 h-6' />Email us at: <span className='text-primary-500'>contact@vikram.com</span></Link>}

            <InputGroup label="Name" placeholder="Enter your name" className="mt-5" />

            <InputGroup label="Description" placeholder="Ask us your Query in Brief" className="mt-4" />

            <PrimaryButton title="Submit" buttonStyle="mt-5 w-full" />

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