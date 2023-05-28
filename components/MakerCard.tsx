import { Instagram, LinkedIn, Mail } from "@mui/icons-material"

function MakerCard(props: MakerCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-white bg-white">
        <img src={props.image} alt={props.name + " Image"} className="h-[55%] w-full object-cover rounded-t-lg" />
        <div className="flex flex-col gap-1 mt-4 px-4">
            <span className="text-xl font-bold text-bg-900">{props.name}</span>
            <span className="text-lg font-medium text-neutral-900">{props.designation}</span>
            <span className="text-lg font-normal text-bg-50 mt-1">{props.description}</span>
        </div>
        <div className="flex flex-row gap-4 mt-4 px-4 pb-4">
            <a href={props.linkedin} target="_blank" rel="noreferrer" className="bg-bg-900 w-9 h-9 rounded-full p-3 flex justify-center items-center">
                <LinkedIn className="fill-white w-5 h-5" />
            </a>
            <a href={props.instagram} target="_blank" rel="noreferrer" className="bg-bg-900 w-9 h-9 rounded-full p-2 flex justify-center items-center">
                <Instagram className="fill-white w-5 h-5" />
            </a>
            <a href={props.mail} target="_blank" rel="noreferrer" className="bg-bg-900 w-9 h-9 rounded-full p-2 flex justify-center items-center">
                <Mail className="fill-white w-5 h-5" />
            </a>
        </div>
    </div>
  )
}

interface MakerCardProps {
    name: string
    description: string
    image: string
    designation: string
    linkedin: string
    instagram: string
    mail: string
}

MakerCard.defaultProps = {
    name: "Vikram Singh",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    image: "/assets/tempMaker.png",
    designation: "Co-Founder",
    linkedin: "https://www.linkedin.com/in/vikram-singh-ai/",
    instagram: "https://www.instagram.com/vikram.ai/",
    mail: "abcd@gmail.com"
}

export default MakerCard