import SpecialText from "@/components/SpecialText"

function UseCases() {

    const useCases = {
        "Normal Users": [
            "If you are a vendor manager and keep getting proposals from sales representatives, you can ask them to reach out to your VBot. Set interaction rules to evaluate the proposals. This will enable your VBot to speak to the sales reps first and shortlist  the most useful ones and set up meetings with you.",
            "If you are a recruiter and keep getting  CVs from candidates, publish your VBot id and direct all resume's to be sent there. The most relevant CVs will be shortlisted by your VBot and sent to you. You can even have your VBot interview the candidate and provide you with a score for each and send you the best candidates.",
            "If you are a business leader and wish to mentor young professionals to build your personal brand. Get a Vbot and program it to offer career advice to young professionals.",
        ],
        "Professionals": [
            {
                title: "Use Case 1: Customized Shopping Assistance",
                description: " If you are a shopping expert, you can create your VBot for personalized shopping assistance • You teach the bots on how to take customer's requirements and suggest the best options by browsing the internet • Customers receive tailored product recommendations • You generate income from their bot's services*"
            },
            {
                title: "Use Case 2: Local City Advisor",
                description: "If you are a long time resident of a city, create a VBot and load it with your valuable knowledge about the city • Teach it on how to answer queries regarding the city to new travellers • Travellers get useful tips regarding the city during their stay • You generate income from Bots services.*"
            },
            {
                title: "Use Case 3: Career counselor",
                description: "If you are a financial advisor, you can create a VBot and teach your approach to financial planning and investment • Clients receive financial advice based on the advisor's unique insights • You earn extra revenue from their bot's consultations*"
            }
        ]
    }

  return (
    <div className="flex flex-col bg-white w-full p-8 pt-12 md:p-24 items-center" id="use-cases">
        <SpecialText extra="text-4xl md:text-5xl font-medium">USE CASES FOR EVERYONE</SpecialText>
        <span className="text-lg text-bg-50 mt-2.5">VIKRAM caters to both normal users and professionals who are looking to monetize their skills by making the bots serve others.</span>

        <div className="flex flex-col mt-14 gap-2.5">
            <SpecialText extra="text-3xl md:text-4xl">Normal Users</SpecialText>
            <span className="font-semibold text-bg-50">Your personal bot comes with a range of pre-built use cases to help you with various tasks. Here's what you can expect from your VIKRAM bot:</span>
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-0 mt-5">
                <img src="/assets/use-case.png" className="self-center md:self-start" alt="" />
                <div className="flex flex-col">
                    <ul className="md:ml-5 mt-8">
                    {
                        useCases["Normal Users"].map((useCase, index) => {
                            return <li key={index} className="text-sm text-bg-50 list-disc my-1.5 list-outside">{useCase}</li>
                        })
                    }
                    </ul>
                    <span className="font-semibold text-bg-50 mt-3">Experience the power of VIKRAM and make your life easier by having a personalized AI bot that caters to your individual needs!</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-10 mt-10">
                <SpecialText extra="text-4xl">Professionals</SpecialText>
                <span className="font-semibold text-bg-50">As an expert, you can use VIKRAM to monetize your skills by building on top of the built-in learning. Create commercial bots that share your expertise, and rest easy knowing your knowledge is protected.</span>
            </div>
                <div className="flex flex-col">
                    <ul className="md:ml-5 mt-4 md:px-16">
                    {
                        useCases["Professionals"].map((useCase, index) => {
                            return <li key={index} className="text-sm text-bg-50 list-none my-1.5 list-outside"><b>{useCase.title} : </b>{useCase.description}</li>
                        })
                    }
                    </ul>
                </div>
        </div>
    </div>
  )
}

export default UseCases