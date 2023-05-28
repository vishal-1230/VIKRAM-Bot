import OutlineButton from "@/components/OutlineButton"
import PrimaryButton from "@/components/PrimaryButton"
import SpecialText from "@/components/SpecialText"
import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ['latin'] })

function HeroSection(props: { title: string, previewParagraph: string[], image: string, buttonText?: string, buttonLink?: string }) {
  return (
    <div className='bg-bg-900 flex gap-12 md:gap-24 flex-col-reverse md:flex-row md:items-center py-14 md:py-24 px-6 md:px-24'>
        <div className="flex flex-col">
          <span className={`text-white font-bold text-5xl mb-5 ${orbitron.className}`}>About <SpecialText>Us</SpecialText></span>
          {
            props.previewParagraph.map((paragraph, index) => {
              return <p key={index} className='text-neutral-500 font-normal text-lg mt-5'>{paragraph}</p>
            })
          }
          <PrimaryButton title="Get your bot" showIcon buttonStyle="w-fit mt-10" />
        </div>
        <div className="min-w-[46%] grid grid-cols-2 gap-5 md:mb-10">
          <div className="flex flex-col gap-5">
            <img src="/assets/aboutUsCover1.png" alt="Hero Section 1" className="w-full h-auto" />
            <img src="/assets/aboutUsCover3.png" alt="Hero Section 2" className="w-full h-auto" />
          </div>
          <div className="flex flex-col gap-5">
            <img src="/assets/aboutUsCover2.png" alt="Hero Section 1" className="w-full h-auto" />
            <img src="/assets/aboutUsCover4.png" alt="Hero Section 2" className="w-full h-auto" />
          </div>
        </div>
    </div>
  )
}

HeroSection.defaultProps = {
    buttonText: "Learn more",
    buttonLink: "/about-us",
    previewParagraph: [
        "They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives. If we leave aside the most empirical tasks, the methods and outputs produced by different individuals is different. There is no one “right way” for every task given by an AI God.",
        "VIKRAM or Variable Inference Knowledge & Response Model is a revolutionary AI framework which leverages on this beautiful variance of human beings. Built over chatgpt, it gives you an opportunity to get your own bot and train it the way you see fit. And then you can lend these bots to others who can use your expertise through your bot while you sit back and watch the bot make money for you!",
        "And our foolproof security architecture ensures that the bot keeps the information, knowledge and skills learnt from you to itself."
    ],
    image: "/assets/temp-blog-cover.png",
    title: "About Us"
}

export default HeroSection