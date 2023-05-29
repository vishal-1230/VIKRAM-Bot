import SpecialText from "@/components/SpecialText"

function Tribute() {

    const tributeTextArray = [
        "We're proud to pay homage to the renowned Indian scientist Vikram Sarabhai. His legacy inspires us to create innovative AI solutions for users and experts.",
        "Vikram Sarabhai, an Indian scientist and visionary, played a pivotal role in shaping India's space program and scientific research. Born on August 12, 1919, in Ahmedabad, Sarabhai had an unwavering commitment to advancing science and technology for the betterment of society.",
        "Sarabhai's most significant contribution was the establishment of the Indian Space Research Organization (ISRO). Under his leadership, ISRO emerged as a leading space agency, launching India's first satellite and paving the way for further space exploration. Beyond space science, Sarabhai also emphasized the importance of education and the application of technology for societal development. He established institutions such as the Physical Research Laboratory, focusing on scientific research and education.",
        "Sarabhai's visionary approach and dedication continue to inspire generations of scientists and researchers. His legacy can be seen in India's achievements in space technology and scientific advancements. Vikram Sarabhai remains an iconic figure, celebrated for his immense contributions to Indian science and his lasting impact on the country's technological progress."
    ]

  return (
    <div className="flex flex-col md:flex-row md:items-center px-4 md:px-24 p-14 md:p-24 gap-10 md:gap-24 bg-white">
        <img src="/assets/vikrambhai.png" alt="" className="w-80 h-80 self-center md:self-start" />
        <div className="flex flex-col">
            <SpecialText extra="text-5xl font-bold mb-6 text-center md:text-left">Tribute to Vikrambhai</SpecialText>
            {
                tributeTextArray.map((paragraph, index) => {
                    return <p key={index} className="text-bg-50 mt-4">{paragraph}</p>
                })
            }
        </div>
    </div>
  )
}

export default Tribute