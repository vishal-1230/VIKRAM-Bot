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
            title: "Blog Title",
            previewParagraph: "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet.",
            image: "/assets/temporaryBlog2.png",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "John Doe",
            authorImage: "/assets/temporaryAuthor.png"
        },
        {
            title: "Blog Title",
            previewParagraph: "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet.",
            image: "/assets/temporaryBlog2.png",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "John Doe",
            authorImage: "/assets/temporaryAuthor.png"
        },
        {
            title: "Blog Title",
            previewParagraph: "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet.",
            image: "/assets/temporaryBlog2.png",
            category: "AI and ML",
            date: "12 June, 2023",
            author: "John Doe",
            authorImage: "/assets/temporaryAuthor.png"
        }
    ])

  return (
    <div className={`${inter.className} flex flex-col`}>
        
        <HeroSection title='Blog Title' previewParagraph={[
            "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet. Vulputate arcu eget quam sed purus mattis duis in ante. Viverra ac enim massa maecenas. Et praesent maecenas sed augue eu nisl condimentum.",
            "Lorem ipsum dolor sit amet consectetur. Varius nulla in elit interdum. Nisl et metus a sem lacus aliquet. Vulputate arcu eget quam sed purus mattis duis in ante. Viverra ac enim massa maecenas. Et praesent maecenas sed augue eu nisl condimentum."
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