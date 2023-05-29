import SpecialText from "@/components/SpecialText"
import { Orbitron } from "next/font/google"
import Image from "next/image"

const orbitron = Orbitron({ subsets: ['latin'] })

function MissionVision() {

    const mission = "Lorem ipsum dolor sit amet consectetur. Lectus nisl sed tempus aliquam. Aliquam sit ultrices lectus dolor venenatis viverra tempor neque placerat. Dui suscipit convallis diam integer nullam. Ultrices non condimentum libero tincidunt eget purus. Nunc sed nunc nullam pulvinar lectus donec adipiscing suspendisse elit. Ornare facilisis elementum pulvinar turpis. Aliquet platea aliquet ipsum proin nunc."
    const vision = "Lorem ipsum dolor sit amet consectetur. Lectus nisl sed tempus aliquam. Aliquam sit ultrices lectus dolor venenatis viverra tempor neque placerat. Dui suscipit convallis diam integer nullam. Ultrices non condimentum libero tincidunt eget purus. Nunc sed nunc nullam pulvinar lectus donec adipiscing suspendisse elit. Ornare facilisis elementum pulvinar turpis. Aliquet platea aliquet ipsum proin nunc."

  return (
    <div className="bg-bg-900 w-full px-4 md:px-24 p-14 md:p-24 flex flex-col items-center">
        <span className={`font-bold text-5xl text-white text-center md:text-left ${orbitron.className}`}>Our <SpecialText>Mission & Vision</SpecialText></span>
        <span className="mt-5 text-neutral-500 text-center">They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives.</span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-14">
            <div className="rounded-lg bg-bg-800 px-6 md:px-10 py-8 flex flex-col">
                <div className="p-6 bg-secondary-500 rounded-[10px] w-fit">
                    <Image src="/assets/mission.svg" className="fill-white" alt="Mission Image" width={25} height={25} />
                </div>
                <span className="text-xl font-bold text-white pb-5 w-fit mt-5 border-b-2 border-b-secondary-500">OUR MISSION</span>
                <span className="text-neutral-500 mt-5">{mission}</span>
            </div>
            <div className="rounded-lg bg-bg-800 px-6 md:px-10 py-8 flex flex-col">
                <div className="p-6 bg-secondary-500 rounded-[10px] w-fit">
                    <Image src="/assets/vision.svg" className="fill-white" alt="Mission Image" width={25} height={25} />
                </div>
                <span className="text-xl font-bold text-white pb-5 w-fit mt-5 border-b-2 border-b-secondary-500">OUR VISION</span>
                <span className="text-neutral-500 mt-5">{mission}</span>
            </div>
        </div>
    </div>
  )
}

export default MissionVision