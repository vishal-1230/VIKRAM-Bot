import SpecialText from "@/components/SpecialText"

function UseCases() {

    const useCases = {
        "Normal Users": [
            "Shopping: Integrated with Flipkart, Amazon, and Meesho APIs, your bot will help you find and shop your favorite items like a fashion expert.",
            "Food Delivery: Your bot is integrated with Swiggy and Zomato APIs, making it easy to discover the perfect restaurants and food items.",
            "Ticket Booking: With MakeMyTrip API integration, your bot will assist you in booking tickets for flights, trains, and buses.",
            "Job Search & Careers: Linked with Naukri and LinkedIn APIs, your bot offers job search assistance, resume modification, and basic career advice.",
            "Personal Assistant & Scheduler: Your VIKRAM bot can act as your personal assistant, interacting with the world on your behalf. It can schedule appointments, meetings, and manage your calendar. The bot can also receive and store important documents, such as bills or invoices, from third parties and retrieve them for you on demand.",
        ],
        "Professionals": "As an expert, you can use VIKRAM to monetize your skills by building on top of the built-in learning. Create commercial bots that share your expertise, and rest easy knowing your knowledge is protected."
    }

  return (
    <div className="flex flex-col bg-white w-full p-14 md:p-24 items-center" id="use-cases">
        <SpecialText extra="text-5xl font-medium">USE CASES FOR EVERYONE</SpecialText>
        <span className="text-lg text-bg-50 mt-2.5">VIKRAM caters to both normal users and professionals who are looking to monetize their skills by making the bots serve others.</span>

        <div className="flex flex-col mt-14 gap-2.5">
            <SpecialText extra="text-4xl">Normal Users</SpecialText>
            <span className="font-semibold text-bg-50">Your personal bot comes with a range of pre-built use cases to help you with various tasks. Here's what you can expect from your VIKRAM bot:</span>
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-0 mt-5">
                <img src="/assets/use-case.png" className="self-center md:self-start" alt="" />
                <div className="flex flex-col">
                    <ul className="md:ml-5 mt-8">
                    {
                        useCases["Normal Users"].map((useCase, index) => {
                            return <li key={index} className="text-sm text-bg-50 list-disc list-outside">{useCase}</li>
                        })
                    }
                    </ul>
                    <span className="font-semibold text-bg-50 mt-3">Experience the power of VIKRAM and make your life easier by having a personalized AI bot that caters to your individual needs!</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row px-4 md:px-0 gap-10 mt-14">
                <SpecialText extra="text-4xl">Professionals</SpecialText>
                <span className="font-semibold text-bg-50">As an expert, you can use VIKRAM to monetize your skills by building on top of the built-in learning. Create commercial bots that share your expertise, and rest easy knowing your knowledge is protected.</span>
            </div>
        </div>
    </div>
  )
}

export default UseCases