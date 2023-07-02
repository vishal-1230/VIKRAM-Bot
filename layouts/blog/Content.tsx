import { useState } from "react"

function Content(props: {blogId: string}) {

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

    const blogs: Blogs = {
        "1": {
            title: "VBots and VIKRAM: Your Guide to Training with Role Description and Steps",
            part1: [
                "Hey there! You've probably heard about VIKRAM, right? If you haven't, let me introduce you: VIKRAM, or the Variable Inference Knowledge & Response Augmentation Model, is a super cool platform where you can cook up your own personal AI - we like to call it a VBot!",
                "Now, you're probably thinking, 'Creating my own VBot? Sounds tough.' Well, guess what? It's as easy as pie with VIKRAM's Role Description and Steps. Let's dive in!"
            ],
            img: "/assets/ss.png",
            part2: [
                {
                    title: "All About Role Description and Steps",
                    content: [
                        "These two ingredients are what make your VBot unique. Role Description is like your VBot's job profile - what it does, what it's good at. Steps are the specific actions it takes to do its job. Sounds simple, right?"
                    ]
                },
                {
                    title: "Whipping up the Perfect Role Description",
                    content: ["Think of Role Description as your VBot's resume. You're gonna want to be specific. Let's say your VBot is going to be a shopping buddy. Your Role Description might be something like, 'You're the ultimate shopping sidekick, always on top of the latest fashion trends and finding the best deals.' The more detailed you are, the better your VBot can copy your style and expertise."]
                },
                {
                    title: "Crafting the Steps",
                    content: [
                        "Steps are like your VBot's to-do list. These should be clear and direct, explaining exactly what your VBot needs to do when it gets a certain prompt or question. Using our shopping sidekick as an example, the Steps could be, 'Get the user's style and budget. And Hunt down matching items online. Show the user your top picks.'. There are 4 kids od steps which you should include to make a perfect recipe.",
                        "1. Requirement Gathering - where you ask the bot to gauge what the user wants",
                        "2. External Data Reference - where you upload some data to the platform and ask the bot to refer the same",
                        "3. Response content - where you tell the bot what should be included in the response",
                        "4. Response style - where you tell the bot the tone and style of responses."
                    ]
                },
                {
                    title: "Chatting and Tweaking",
                    content: ["Once you've got your Role Description and Steps, it's time to have a chat with your VBot. See how it responds, and then tweak the Role Description and Steps to make them even better. It's all about trial and error."]
                },
                {
                    title: "Checking in and Updating",
                    content: ["Just like you wouldn't wear last year's fashion, your VBot should always be up-to-date. Every now and then, take a look at your Role Description and Steps and see if they need a revamp. You might add new Steps, tweak the Role Description, or even come up with a whole new role for your VBot!"]
                },
                {
                    title: "Wrap Up",
                    content: ["So there you have it! With a solid Role Description and some simple Steps, you can train your VBot to be the ultimate personal assistant. Don't forget, it's all about creating a VBot that not only does the job but also feels uniquely you. So get out there and start cooking up your perfect VBot!"]
                }
            ]
        },
        "2": {
            title: "",
            part1: ["In recent years, a burning question has fueled substantial debate within our society: will artificial intelligence (AI) usurp human jobs? With the introduction of VIKRAM, a pioneering AI platform, this query is about to be reimagined.",
                "VIKRAM, an acronym for Variable Inference Knowledge & Response Augmentation Model, isn't just another addition to the AI echelon. Instead, it represents a revolutionary platform where individuals can forge their unique Virtual Bot (VBot) - a digital entity that encapsulates personal style, experiential knowledge, and distinctive problem-solving abilities. This VBot operates as a digital counterpart, augmented by the inherent speed and computational power of AI.",
                "One of the notable elements setting VIKRAM apart is its crucial emphasis on human variance. Each person embodies a unique methodology, a distinctive cognitive approach, and an individual communication style. VIKRAM doesn't merely recognize this human attribute, but amplifies it with the prowess of AI. Individuals train their VBots to mirror their own operating styles, thinking patterns, and communication preferences, creating not a replacement, but an extension of themselves that enhances their productivity manifold.",
                "Another innovative aspect of VIKRAM is its potential to revolutionize income generation. Once the VBot is adequately trained, it can serve others on the platform, undertaking tasks and providing a novel revenue stream for its creator.",
            ],
            img: "/assets/bg-2.jpeg",
            part2: [
                {
                    title: "Threat to Employment?",
                    content: [
                        "So, does AI signify an existential threat to employment? The advent of VIKRAM suggests otherwise. This groundbreaking platform integrates the capabilities of AI with the distinctiveness of human variance, fostering a collaborative synergy rather than a displacement scenario. VIKRAM heralds a new era in the workforce landscape where AI and human variance harmoniously coexist, marking a paradigm shift in our understanding of employment in the AI age."
                    ]
                }
            ]
        },
        "3": {
            title: "",
            part1: ["Vikas, the CEO of a bustling corporation sits comfortably in their office while their AI bot, powered by VIKRAM, attends a crucial board meeting on their behalf. The AI bot is trained to understand the CEO's vision, strategies, and decision-making patterns. It adeptly navigates through complex discussions, offers insights, and even negotiates deals, impressing the board members with its comprehensive knowledge and analytical prowess. The CEO confidently leads the company from behind the scenes, while the AI bot becomes a trusted representative, ensuring the CEO's vision is flawlessly executed.",
            "Rakshit is an HR professional with around 10 years of experience. He is an expert in crafting employee policies, attrition management and employee engagement. He creates a bot which is working for 10 companies at the same time – attending meetings writing emails, launching campaigns and taking exit interviews. But where is Rakshit? He is with his family enjoying the cool sea breeze in Goa. ",
            "These 2 scenarios which look straight out of a sci-fi movie might be possible in the future with VIKRAM or Variable Inference Knowledge & Response Augmentation Model. Developed by a group of engineering college students, VIKRAM empowers individuals to train their own bots, infusing them with unique knowledge, skills, and experiences. This distinctive feature, known as variable inference, allows users to shape their bots' responses in a way that captures their individual style and expertise. ",
            "VIKRAM is an effort to completely reverse the narrative on job losses due to AI. The makers of this breakthrough model believe that since each individual is unique, the outputs and responses produced by them are unique and that’s what makes them valuable. It combines the intelligence and strength of AI with the variance of humans.",
            "Imagine a future where your bot can attend meetings on your behalf, work diligently in companies, or assist you in a myriad of tasks, tailored precisely to your needs. With VIKRAM, this future is within reach.",
            "The implications of VIKRAM are vast and far-reaching. This platform has the potential to transform the professional landscape, enabling individuals to extend their capabilities, increase productivity, and even generate additional income by lending their bots to others seeking specialized assistance.",
            "But VIKRAM is not just a tool for the tech-savvy elite. The creators have designed it with simplicity in mind, ensuring that even those without extensive coding knowledge can leverage its power. VIKRAM opens the doors of AI to a wider audience, democratizing the technology and empowering individuals from all walks of life.",
            "As we unveil VIKRAM to the world, the excitement is palpable. This platform is poised to disrupt the AI landscape, forever altering the way we interact with technology and harnessing the potential of AI like never before.",
            "The future of AI has arrived, and its name is VIKRAM."],
            img: "",
            part2: []
        }  
    }

  return (
    <div className="flex flex-col">
        
        {
            blogs[blogId].part1.map((content, index) => {
                return (
                    <p key={index} className="text-justify py-2">{content}</p>
                )
            })
        }

        {
            blogs[blogId].img !== "" && ( <img src={blogs[blogId].img} alt="blog" className="w-full h-auto my-4 md:my-10" /> )
        }

        {
            blogs[blogId].part2.map((content, index) => {
                return (
                    <div key={index} className="flex flex-col py-4 text-bg-900">
                        <h1 className="text-3xl font-semibold mb-3">{content.title}</h1>
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

interface Blogs {
    [blogId: string]: {
        title: string
        part1: string[]
        img: string
        part2: ContentParts[]
    }
}

export default Content