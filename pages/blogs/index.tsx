import HeroSection from '@/layouts/blogs/HeroSection'
import BlogsSection from '@/layouts/blogs/BlogsSection'
import { Inter } from 'next/font/google'
import React from 'react'
import Button from '@/components/SpecialButton'
import SubscribeBox from '@/components/SubscribeBox'

const inter = Inter({ subsets: ['latin'] })

function Blogs() {
    
    const [blogs, setBlogs] = React.useState([
        {
            title: "VBots and VIKRAM",
            blogId: "1",
            previewParagraph: "Hey there! You've probably heard about VIKRAM, right? If you haven't, let me introduce you: VIKRAM, or the Variable Inference Knowledge & Response Augmentation Model...",
            image: "/assets/temporaryBlog2.png",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "John Doe",
            authorImage: "/assets/temporaryAuthor.png"
        },
        {
            title: "Melding Human Individuality with AI",
            blogId: "2",
            previewParagraph: "In recent years, a burning question has fueled substantial debate within our society: will artificial (AI) usurp human jobs?",
            image: "/assets/bg-2.jpeg",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "John Doe",
            authorImage: "/assets/temporaryAuthor.png"
        },
        {
            title: "What the Future Holds?",
            blogId: "3",
            previewParagraph: "Vikas, the CEO of a bustling corporation sits comfortably in their office while their AI bot, powered by VIKRAM, attends a crucial board meeting...",
            image: "/assets/bg-3.jpg",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "John Doe",
            authorImage: "/assets/temporaryAuthor.png"
        }
    ])

  return (
    <div className={`${inter.className} flex flex-col`}>
        
        <HeroSection title='VBots and VIKRAM: Your Guide to Training with...' previewParagraph={[
            "Hey there! You've probably heard about VIKRAM, right? If you haven't, let me introduce you: VIKRAM, or the Variable Inference Knowledge & Response Augmentation Model, is a super cool platform where you can cook up your own personal AI - we like to call it a VBot!",
            "Now, you're probably thinking, 'Creating my own VBot? Sounds tough.' Well, guess what? It's as easy as pie with VIKRAM's Role Description and Steps. Let's dive in!"
            ]} image="/assets/temporaryBlog.png"
        />

        <BlogsSection title="Trending Topics" blogs={blogs} />

        <BlogsSection title="Suggested Topics" blogs={blogs} />

        <div className='my-16 mb-24 flex flex-row justify-center'>
            <SubscribeBox />
        </div>
    </div>
  )
}

export default Blogs