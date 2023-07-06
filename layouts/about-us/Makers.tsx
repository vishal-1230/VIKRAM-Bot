import MakerCard from "@/components/MakerCard"
import SpecialText from "@/components/SpecialText"
import SubscribeBox from "@/components/SubscribeBox"

function Makers() {
  return (
    <div className="flex flex-col px-4 md:px-24 p-14 md:p-24 items-center">
        <SpecialText extra="text-5xl font-bold">Our Makers</SpecialText>
        {/* <span className="text-bg-50 mt-5 text-center">They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives.</span> */}

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 absolute -z-10">
                <img src="/assets/makers-bg-1.png" alt="" />
                <img src="/assets/makers-bg-2.png" alt="" />
            </div>
            <MakerCard name="Ria" designation="AI Architect" description="Machine Learning & AI Specialist" />
            <MakerCard name="Aastha Katakwar" image="/team/aastha.jpeg" designation="Python Wizard" description="Developer with Expertise in Python and Logic" linkedin="https://www.linkedin.com/in/aastha-katakwar-a2967a208/" college="Medi-Caps University" />
            <MakerCard name="Vishal Vishwajeet" image="/team/vishal2.jpeg" designation="Web Craftsman" description="Interface Specialist with Backend APIs" linkedin="https://www.linkedin.com/in/vishal-vishwajeet/" college="Delhi Technological University" />
            <MakerCard name="Gunjan Paneri" image="/team/gunjan.jpeg" designation="Visual Stylist" description="The UI Designer for Web Interface Aesthetics" linkedin="https://www.linkedin.com/in/gunjanpaneri871" college="Chandigarh University" />
        </div>

        {/* manager and founder */}
        <div className="flex flex-col self-start">
          <span className="text-bg-900 text-lg font-bold mt-10 self-start">
            {/* right arrow */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-6 inline-block mr-1 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
            A Project Owned by <SpecialText>Arthlex Research Pvt Ltd</SpecialText> & managed by <SpecialText>Code8.</SpecialText>
          </span>
        </div>

        <SubscribeBox boxStyle="mt-14" />

    </div>
  )
}

export default Makers