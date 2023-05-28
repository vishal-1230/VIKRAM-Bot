import MakerCard from "@/components/MakerCard"
import SpecialText from "@/components/SpecialText"
import SubscribeBox from "@/components/SubscribeBox"

function Makers() {
  return (
    <div className="flex flex-col p-24 items-center">
        <SpecialText extra="text-5xl font-bold">Our Makers</SpecialText>
        <span className="text-bg-50 mt-5 text-center">They say that ChatGpt is going to take away jobs. Well if that happens, the world will surely be a drab place! Every person is brings in unique perspectives.</span>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-10 mt-14">
            <div className="grid grid-cols-1 md:grid-cols-2 absolute -z-10">
                <img src="/assets/makers-bg-1.png" alt="" />
                <img src="/assets/makers-bg-2.png" alt="" />
            </div>
            <MakerCard />
            <MakerCard />
            <MakerCard />
            <MakerCard />
            <MakerCard />
            <MakerCard />
            <MakerCard />
            <MakerCard />
        </div>

        <SubscribeBox boxStyle="mt-14" />

    </div>
  )
}

export default Makers