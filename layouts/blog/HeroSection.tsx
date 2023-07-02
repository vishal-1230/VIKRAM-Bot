import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ['latin'] })

function HeroSection(props: {blogId: string}) {
  const titles: {[blogId: string]: string} = {
    "1": "VBots and VIKRAM: Your Guide to Training with Role Description and Steps",
    "2": "VIKRAM: A Breakthrough Platform Melding Human Individuality with AI",
    "3": "VIKRAM - What the Future Holds?"
  }
  return (
    <div className="flex flex-col items-center justify-center bg-bg-900 py-6 md:py-12">
            <img src="/assets/chatbot-bg-1.gif" alt="" className="w-[90vw] h-auto" />
            <span className={`text-4xl text-center md:text-5xl md:mx-16 font-bold my-5 md:my-10 text-white ${orbitron.className}`}>{titles[props.blogId]}</span>
    </div>
  )
}

export default HeroSection