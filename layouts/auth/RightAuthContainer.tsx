import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ['latin'] })

function RightAuthContainer(props: { children?: React.ReactNode, title?: string }) {
  return (
    <div className="bg-white flex flex-col px-28 lg:px-36 pr-24 lg:pr-32 py-20 pt-28 mr-0 rounded-l-3xl lg:min-w-max duration-200">
      <select name="language" id="language" className="absolute top-12 right-24 bg-transparent outline-none duration-200 font-sm text-neutral-700 after:ml-3">
        <option value="en" className="p-1">English</option>
        <option value="hi" className="p-1">Hindi</option>
      </select>
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