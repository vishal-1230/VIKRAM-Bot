import React from 'react'

function LeftInfo(props: { robotIcon?: string, style?: string }) {
    return (
        <div className={`flex flex-col px-20 relative text-white ${props.style}`}>
            <div className="absolute w-[90%] h-full overflow-y-clip left-0">
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full' />
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full mt-12' />
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full mt-12' />
                <img src="/assets/bg-ai-bars.svg" alt="" className='w-full mt-12' />
            </div>
            <img src="/assets/logo2.svg" alt="" className="fill-white w-32 h-32 mt-10 z-10" />
            <span className="text-2xl text-white mt-10 z-10">V.I.K.R.A.M.</span>
            <span className="font-semibold text-4xl z-10">Your personal bot!</span>
            <span className='mt-5 z-10'>VIKRAM is a platform that lets you create your own bot that learns your preferences and skills.</span>
            <img src={props.robotIcon ? props.robotIcon : "/assets/robot-1.svg"} alt="" className="h-80 w-64 mt-20 z-10" />
        </div>
    )
}

export default LeftInfo