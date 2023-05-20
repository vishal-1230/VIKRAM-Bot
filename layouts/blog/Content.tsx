import { useState } from "react"

function Content(props: {blogId?: string}) {

    const blogId = props.blogId
    const [part1, setPart1] = useState<string[]>([
        "Lorem ipsum dolor sit amet consectetur. Lectus nisl sed tempus aliquam. Aliquam sit ultrices lectus dolor venenatis viverra tempor neque placerat. Dui suscipit convallis diam integer nullam. Ultrices non condimentum libero tincidunt eget purus. Nunc sed nunc nullam pulvinar lectus donec adipiscing suspendisse elit. Ornare facilisis elementum pulvinar turpis. Aliquet platea aliquet ipsum proin nunc.",
        "Vel dignissim diam massa amet diam ipsum sapien consectetur tristique. Pellentesque morbi nunc nunc vitae. Felis nulla sollicitudin urna ultricies mi luctus pellentesque ut quis. At aliquam sollicitudin eget pretium dui in amet egestas. Viverra quam a orci risus et eu nullam nec auctor. Gravida turpis odio vestibulum feugiat neque nunc. Laoreet semper vulputate nunc tempor id facilisis ornare. Sed dui ut risus eget mi. Pharetra aenean lorem est ultrices. Quis bibendum at quam ipsum et condimentum. Libero nisl urna vel cursus tellus porttitor. Malesuada morbi nunc vitae in quis congue. Commodo eleifend purus a sapien accumsan integer vestibulum. Felis odio varius vivamus odio lobortis. Maecenas est arcu aliquet et eget nullam convallis dui tincidunt.um lorem. Elit semper maecenas habitant egestas sit vel est consequat rhoncus. Congue eget eleifend praesent velit porttitor in erat diam."
    ])
    const [img, setImg] = useState<string>("/assets/temp-blog-image.png")
    const [part2, setPart2] = useState<ContentParts[]>([
        {
            title: "Pellentesque massa ultricies",
            content: [
                "Lorem ipsum dolor sit amet consectetur. Lectus nisl sed tempus aliquam. Aliquam sit ultrices lectus dolor venenatis viverra tempor neque placerat. Dui suscipit convallis diam integer nullam. Ultrices non condimentum libero tincidunt eget purus. Nunc sed nunc nullam pulvinar lectus donec adipiscing suspendisse elit. Ornare facilisis elementum pulvinar turpis. Aliquet platea aliquet ipsum proin nunc.",
                "Vel dignissim diam massa amet diam ipsum sapien consectetur tristique. Pellentesque morbi nunc nunc vitae. Felis nulla sollicitudin urna ultricies mi luctus pellentesque ut quis. At aliquam sollicitudin eget pretium dui in amet egestas. Viverra quam a orci risus et eu nullam nec auctor. Gravida turpis odio vestibulum feugiat neque nunc. Laoreet semper vulputate nunc tempor id facilisis ornare. Sed dui ut risus eget mi. Pharetra aenean lorem est ultrices. Quis bibendum at quam ipsum et condimentum. Libero nisl urna vel cursus tellus porttitor. Malesuada morbi nunc vitae in quis congue. Commodo eleifend purus a sapien accumsan integer vestibulum. Felis odio varius vivamus odio lobortis. Maecenas est arcu aliquet et eget nullam convallis dui tincidunt.um lorem. Elit semper maecenas habitant egestas sit vel est consequat rhoncus. Congue eget eleifend praesent velit porttitor in erat diam."
            ]
        },
        {
            title: "Pellentesque massa ultricies",
            content: [
                "Eleifend ac eget eget purus sed metus euismod. Nulla ac nam vulputate nullam volutpat vulputate sit consectetur. In aliquet massa ut odio iaculis a inElit interdum sed viverra purus facilisi a enim non. Eget arcu elementum massa amet tortor. Sit tellus leo id pulvinar. Quisque dictum diam vulputate quisque. Massa duis porta congue congue porttitor dui accumsan sit. Laoreet tortor magna posuere facilisis blandit adipiscing viverra. Maecenas bibendum enim urna ultricies. Eu a amet sit turpis ut sit quam. Sed elementum tincidunt quam arcu etiam quam. Ligula dictum fringilla posuere tortor nisi. Commodo accumsan risus a nisi nibh morbi diam enim. In at egestas at elementum faucibus.",
                "Aliquam diam vivamus quis lacus eget mauris netus diam. Sagittis sed sem semper in. Eget a sed auctor pellentesque risus augue. Est tincidunt velit sed consectetur risus sit id eleifend mattis. Nunc adipiscing nascetur accumsan ornare. Ut vestibulum duis sit hac platea consectetur non.",
                "Velit non enim duis facilisis cursus. Ultricies sed morbi at ac adipiscing risus amet interdum turpis. Egestas viverra tincidunt pellentesque ullamcorper ornare. Pharetra vel sed et curabitur interdum. Lorem fringilla ante semper mauris tortor vel egestas nunc felis. Tellus laoreet magna diam turpis amet congue ultrices posuere. Facilisi egestas aenean amet gravida dis viverra nibh. Auctor hendrerit ac mauris quis massa orci cras integer. Mauris in turpis pharetra praesent tristique pretium tortor hendrerit at. Purus sed etiam id libero fermentum lorem. Elit semper maecenas habitant egestas sit vel est consequat rhoncus. Congue eget eleifend praesent velit porttitor in erat diam."
            ]
        }
    ])

  return (
    <div className="flex flex-col">
        
        {
            part1.map((content, index) => {
                return (
                    <p key={index} className="text-justify py-4">{content}</p>
                )
            })
        }

        {
            img !== "" && ( <img src={img} alt="blog" className="w-full h-auto my-4 md:my-10" /> )
        }

        {
            part2.map((content, index) => {
                return (
                    <div key={index} className="flex flex-col py-8 text-bg-900">
                        <h1 className="text-3xl font-semibold mb-4">{content.title}</h1>
                        {
                            content.content.map((content, index) => {
                                return (
                                    <p key={index} className="text-justify py-3.5">{content}</p>
                                )
                            })
                        }
                    </div>
                )
            })
        }

    </div>
  )
}

interface ContentParts {
    title: string
    content: string[]
}

export default Content