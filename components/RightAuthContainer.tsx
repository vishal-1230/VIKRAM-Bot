import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ['latin'] })

function RightAuthContainer(props: { children?: React.ReactNode, title?: string }) {
  return (
    <div className="bg-white flex flex-col px-36 pr-32 py-20 pt-28 mr-0 rounded-l-3xl min-w-max">
        {
            props.title && (
                <span className={`text-black font-bold min-w-max text-5xl ${orbitron.className}`}>{props.title}</span>
            )
        }
        {props.children}
    </div>
  )
}

export default RightAuthContainer