import Content from '@/layouts/blog/Content'
import ExploreMore from '@/layouts/blog/ExploreMore'
import HeroSection from '@/layouts/blog/HeroSection'
import { Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import React from 'react'

const inter = Inter({ subsets: ['latin'] })

function Blog() {

    const router = useRouter()
    const blogId = router.query.blogid

  return (
    <div className={`flex flex-col ${inter.className}`}>
        
        <HeroSection blogId={typeof blogId === "string" ? blogId : "1"} />

        <div className="px-4 py-5 md:p-24 pb-8">
            <Content blogId={typeof blogId === "string" ? blogId : "1"} />
        </div>

        <div className="mx-4 md:mx-24 py-10 md:py-24 pt-14 border-t border-neutral-500">
            <ExploreMore blogId={typeof blogId === "string" ? blogId : "1"} />
        </div>

    </div>
  )
}

export default Blog