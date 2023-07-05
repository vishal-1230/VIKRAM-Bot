import MakerCard from "@/components/MakerCard"
import SpecialText from "@/components/SpecialText"
import SubscribeBox from "@/components/SubscribeBox"

function Makers() {
  return (
    <div className="flex flex-col px-4 md:px-24 p-14 md:p-24 items-center">
        <SpecialText extra="text-5xl font-bold">Our Makers</SpecialText>
        <span className="text-bg-50 mt-5 text-center">They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives.</span>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 absolute -z-10">
                <img src="/assets/makers-bg-1.png" alt="" />
                <img src="/assets/makers-bg-2.png" alt="" />
            </div>
            <MakerCard name="Ria" designation="AI Architect" description="Machine Learning & AI Specialist" />
            <MakerCard name="Aastha Katakwar" designation="Python Wizard" description="Developer with Expertise in Python and Logic" />
            <MakerCard name="Vishal Vishwajeet" designation="Web Craftsman" description="Interface Specialist with Backend APIs" />
            <MakerCard name="Gunjan Paneri" designation="Visual Stylist" description="The UI Designer for Web Interface Aesthetics" />
        </div>

        <SubscribeBox boxStyle="mt-14" />

    </div>
  )
}

export default Makers