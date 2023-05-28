import { Inter, Orbitron } from 'next/font/google'
// import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion'
import Button from '@/components/SpecialButton'
import SubscribeBox from '@/components/SubscribeBox'
import Accordion from '@/components/Accordion'

const orbitron = Orbitron({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

// const AccordionItem = ({ header, ...rest } : {header: string, children: any}) => (
//   <Item
//     {...rest}
//     header={({ state: { isEnter } }) => (
//       <>
//         <span className='text-lg font-semibold'>{header}</span>
//         <img
//           className={`ml-auto transition-transform duration-200 ease-in-out ${
//             isEnter && "rotate-225"
//           }`}
//           src="/assets/add.svg"
//           alt="Chevron"
//         />
//       </>
//     )}
//     className="border-b py-1 !bg-transparent select-none"
//     buttonProps={{
//       className: ({ isEnter }) =>
//         `flex w-full p-4 text-left`
//         // ${
//           // isEnter && "bg-slate-200"
//         // }
//     }}
//     contentProps={{
//       className: "transition-height duration-200 ease-in-out text-left"
//     }}
//     panelProps={{ className: "p-4" }}
//   />
// );

const faqs = [
  {
    header: "What is VIKRAM?",
    content: "This website is a personal project of mine to help me learn Next.js and Tailwind CSS. I also wanted to create a website that would be useful to me and others."
  },
  {
    header: "Why do we use it?",
    content: "This website is a personal project of mine to help me learn Next.js and Tailwind CSS. I also wanted to create a website that would be useful to me and others."
  },
  {
    header: "How do we use VIKRAM?",
    content: "This website is a personal project of mine to help me learn Next.js and Tailwind CSS. I also wanted to create a website that would be useful to me and others."
  },
  {
    header: "Is VIKRAM paid?",
    content: "This website is a personal project of mine to help me learn Next.js and Tailwind CSS. I also wanted to create a website that would be useful to me and others."
  },
  {
    header: "VIKRAM is for what type of users?",
    content: "This website is a personal project of mine to help me learn Next.js and Tailwind CSS. I also wanted to create a website that would be useful to me and others."
  }
]


function FAQs() {
  return (
    <div className={`text-white flex flex-col relative self-center text-center w-full px-5 md:px-32 py-16 md:py-32 md:p-32 lg:px-60 ${inter.className} bg-gradient-to-r from-[#C816D333] to-[#1A9EDA33]`}>
      <span className={`font-semibold text-4xl mb-10 ${orbitron.className}`}>FAQS</span>
      <Accordion faqs={faqs} expandButon={2} showBorder={false} numbering={true} />
      {/* <SubscribeBox boxStyle='mt-24 -bottom-24 -mb-56' /> */}

    </div>
  )
}

export default FAQs