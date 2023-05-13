import { Inter, Orbitron } from 'next/font/google'
import React from 'react'
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion'
import Button from '@/components/SpecialButton'

const orbitron = Orbitron({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

const AccordionItem = ({ header, ...rest } : {header: string, children: any}) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <img
          className={`ml-auto transition-transform duration-200 ease-in-out ${
            isEnter && "rotate-225"
          }`}
          src="/assets/add.svg"
          alt="Chevron"
        />
      </>
    )}
    className="border-b py-1 !bg-transparent"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left`
        // ${
          // isEnter && "bg-slate-200"
        // }
    }}
    contentProps={{
      className: "transition-height duration-200 ease-in-out"
    }}
    panelProps={{ className: "p-4" }}
  />
);

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
    <div className={`text-white flex flex-col relative self-center text-center w-full mt-32 p-32 mb-44 lg:px-60 ${inter.className} bg-gradient-to-r from-[#C816D333] to-[#1A9EDA33]`}>
      <span className={`font-semibold text-4xl mb-10 ${orbitron.className}`}>FAQS</span>
      <Accordion transition transitionTimeout={200}>
        {
          faqs.map((faq, index) => (
            <AccordionItem key={index} header={faq.header}>
              {faq.content}
            </AccordionItem>
          ))
        }
      </Accordion>
      <div className='flex flex-col xl:flex-row bg-white justify-between px-12 min-w-fit lg:min-w-0 py-14 rounded-lg gap-10 mt-24 -bottom-24 -mb-56'>
        <div className='flex flex-col text-black text-left min-w-max'>
          <span className='font-bold text-3xl flex-wrap'>Subscribe to our Updates!</span>
          <span className='font-light text-lg'>Lorem ipsum lorem ipsum lorem ipsum</span>
        </div>
        <div className='flex flex-col md:flex-row md:justify-between border-[1px] border-[#eeeeee] py-2.5 pl-6 pr-3.5 rounded-lg w-full lg:min-w-max h-fit self-center' style={{boxShadow: "0px 0px 6px -2px #000"}}>
          <input type="text" placeholder="Enter your email" className='outline-none text-black w-min mt-2 md:mt-0' />
          <Button title="Sign Up" buttonStyle='mt-3 md:mt-0' Icon={()=>{return}}></Button>
        </div>
      </div>
    </div>
  )
}

export default FAQs