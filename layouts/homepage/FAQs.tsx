import { Inter, Orbitron } from 'next/font/google'
import React from 'react'
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion'

const orbitron = Orbitron({ subsets: ['latin'] })
const inter = Inter({ subsets: ['latin'] })

const AccordionItem = ({ header, ...rest }) => (
  <Item
    {...rest}
    header={({ state: { isEnter } }) => (
      <>
        {header}
        <img
          className={`ml-auto transition-transform duration-200 ease-in-out ${
            isEnter && "rotate-180"
          }`}
          src="/assets/chevron.png"
          alt="Chevron"
        />
      </>
    )}
    className="border-b py-1 !bg-transparent"
    buttonProps={{
      className: ({ isEnter }) =>
        `flex w-full p-4 text-left ${
          isEnter && "bg-slate-200"
        }`
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
    <div className={`text-white flex flex-col self-center text-center w-full mt-32 p-32 md:px-60 ${inter.className} bg-gradient-to-r from-[#C816D333] to-[#1A9EDA33]`}>
      <span className={`font-semibold text-4xl ${orbitron.className}`}>FAQS</span>
      <Accordion transition transitionTimeout={200}>
        {
          faqs.map((faq, index) => (
            <AccordionItem key={index} header={faq.header}>
              {faq.content}
            </AccordionItem>
          ))
        }
      </Accordion>
    </div>
  )
}

export default FAQs