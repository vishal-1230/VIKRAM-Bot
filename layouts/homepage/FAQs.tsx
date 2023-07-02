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
    header: "What is VIKRAM and how does it work?",
    content: "VIKRAM, or Variable Inference Knowledge & Response Augmentation Model, is a unique platform that allows you to create, train, and monetize your own AI-powered bot. The system lets you impart your personal knowledge, skills, and style to your bot, and then allows you to offer the services of your bot to others, potentially creating an additional revenue stream."
  },
  {
    header: "How do I get started with creating my own bot?",
    content: "You start by registering on the VIKRAM platform and defining the specializations for your bot. After verification, a bot with a unique ID is created for you. You can then use the training tab to define roles, role descriptions, and steps that your bot should follow. After enough interactions and refinements, your bot will be ready to serve others."
  },
  {
    header: "How can I make money with my VIKRAM bot?",
    content: "Once you've trained your bot and defined its roles, you can make it available for others to use on the platform. Others will interact with your bot and give it a Thumbs up or Down. You can monetize your bot after 50 Up reviews and can set a fee for the use of your bot's services, which can range from 10 INR to 50 INR. When other users hire your bot to assist them, you receive the fee."
  },
  {
    header: "Is my personal data safe with VIKRAM?",
    content: "Yes, VIKRAM is designed to prioritize your privacy. While the bot learns from your interactions, it doesn't give out any data about you or its training to anyone using its services. The interactions between you and your bot, including the role descriptions and steps, remain proprietary to you."
  },
  {
    header: "What are the different applications of VIKRAM bots?",
    content: "The potential applications of VIKRAM bots are vast and depend largely on how they are trained. They can serve as personal assistants, tutors, content creators, career counsellors, customer service representatives, and more. The bot can also integrate with various apps and platforms to handle tasks like managing your email, searching the internet, and interacting with e-commerce portals and job portals."
  },
  {
    header: "How can I use other people's bots?",
    content: "You can access other users' bots via the chat interface on the VIKRAM platform. You'll need to enter the unique ID of the bot you wish to use, and then you'll be able to interact with the bot as per the role it's been trained for."
  }
]


function FAQs() {
  return (
    <div className={`text-white flex flex-col relative self-center text-center w-full px-5 md:px-32 py-16 md:py-32 md:p-32 lg:px-60 ${inter.className} bg-gradient-to-r from-[#C816D333] to-[#1A9EDA33]`}>
      <span className={`font-semibold text-4xl mb-10 ${orbitron.className}`}>FAQS</span>
      <Accordion faqs={faqs} expandButon={2} showBorder={false} />
      {/* <SubscribeBox boxStyle='mt-24 -bottom-24 -mb-56' /> */}
      
    </div>
  )
}

export default FAQs