import LongBlogCard from "@/components/LongBlogCard"
import SpecialText from "@/components/SpecialText"

function ExploreMore(props: {blogId?: string}) {
  return (
    <div className="flex flex-col">
        <span className="flex flex-col md:flex-row justify-between">
            <SpecialText extra="font-bold text-3xl md:text-4xl">Explore More</SpecialText>
            <span className="text-primary-500 cursor-pointer mt-2 md:mt-0">View all</span>
        </span>
        <div className="blogs mt-2 border-b border-bg-50">
            <LongBlogCard className="md:!my-10 " />
            <LongBlogCard className="md:!my-10 " />
        </div>
    </div>
  )
}

export default ExploreMore