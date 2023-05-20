import { Orbitron } from "next/font/google"

const orbitron = Orbitron({ subsets: ['latin'] })

function HeroSection(props: {blogId?: string}) {
  return (
    <div className="flex flex-col items-center justify-center bg-bg-900 py-6 md:py-12">
            <img src="/assets/temp-blog-cover.png" alt="" className="w-[90vw] h-auto" />
            <span className={`text-4xl md:text-5xl font-bold my-5 md:my-10 text-white ${orbitron.className}`}>Blog Title</span>
    </div>
  )
}

export default HeroSection