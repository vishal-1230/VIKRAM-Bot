import Image from "next/image"

function FeaturesList({features} : {features: {image: string, description: string}[]}) {
  return (
    <div className="grid grid-cols-4 px-12 my-20 flex-0">
    {
        features.map((feature, index) => {
            return (
                <div className={index === 0 ? 
                    `bg-gradient-to-t from-[#FFFFFF4D] to-transparent p-[0.5px] pl-[2px] pr-[1px]`
                    : index === features.length - 1 ?
                    "bg-gradient-to-b from-[#FFFFFF4D] to-transparent p-[0.5px] pr-[2px] pl-[1px]"
                    : index%2 === 0 ?
                    "bg-gradient-to-t from-[#FFFFFF4D] to-transparent p-[0.5px] px-[0.6px]"
                    :
                    "bg-gradient-to-b from-[#FFFFFF4D] to-transparent p-[0.5px] px-[0.6px]"
                    } key={index}>
                <div className={index%2==0 ? 
                    "flex flex-col items-center gap-6 h-full p-10 bg-[#0B0B15] bg-gradient-to-t from-[#10101b] to-[rgba(26, 158, 218, 0)]"
                    :
                    "flex flex-col items-center gap-6 h-full p-10 bg-[#0B0B15] bg-gradient-to-b from-[#10101b] to-[rgba(26, 158, 218, 0)]"
                }>
                    <Image src={feature.image} alt="Feature" height={70} width={70} />
                    <p className='text-center text-[#FFFFFFD9]'>{feature.description}</p>
                </div>
                </div>
            )
        })
    }
    </div>
  )
}

export default FeaturesList