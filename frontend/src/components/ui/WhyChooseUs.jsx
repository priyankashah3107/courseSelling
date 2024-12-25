import React, { useState } from 'react'
import { Minus, Plus } from "lucide-react"

const whychooseus = [
    {
        id: 1,
        value: "01",
        title: "Learn from the best",
        description: "Harkirat is the best in India when it comes to learning about remote work and open source"
    },
    {
        id: 2,
        value: "02",
        title: "Beginner Friendly",
        description: "Start from the basics and go deep into the technology using projects"
    },
    {
        id: 3,
        value: "03",
        title: "Reach your inflection point",
        description: "Become a self sufficient developer in tech"
    },
    {
        id: 4,
        value: "04",
        title: "Open Source",
        description: "Helping you  make you first open source contribution"
    },
    {
        id: 5,
        value: "05",
        title: "Vision control",
        description: "Helping you understand the basics how version control is implemented in the industry"
    },
    {
        id: 6,
        value: "06",
        title: "Assignments",
        description: "Harkirat has personally created assignments after every week of study, so it's extremely hands on"
    }
]
const WhyChooseUs = () => {
    const [isOpen, setIsopen] = useState({})

    const handleOpen = (id) => {
        setIsopen((prevStates) => ({
            ...prevStates,
            [id]: !prevStates[id],
        }))
    }
  return (
    <>
    <div className='flex flex-col mt-32 md:mt-44 '>

        <h1 className="text-white text-[30px] md:text-[44px] font-bold font-['Poppins'] leading-[70.40px]">Why choose Us</h1>

        {whychooseus.map((val, index) => (
            <div key={index}
            style={{
                boxShadow: '0 2px 2px rgba(222, 249, 250, 0.5), 0 8px 25px rgba(190, 243, 245, 0.4), 0 12px 35px rgba(51, 187, 207, 0.3)',
              }}
            className='max-w-5xl sm:w-auto  w-full grid grid-rows-1 p-10 sm:px-[92px] sm:py-[29px]  border border-[#191a23] bg-gradient-to-br from-[#272727] to-[#100f1c] rounded-[25px] mt-10 autoShow'
             > 
             <div className='flex flex-row justify-between items-center '>

             <div className='flex flex-row gap-6 sm:gap-10 items-center'>
            <h1 className='text-white text-2xl sm:text-6xl font-medium '>{val.value}</h1>
            <h3 className='text-white text-lg sm:text-3xl font-medium'>{val.title}</h3>
            </div>
            {/* <Plus />  */}
            <div onClick={() => handleOpen(val.id)} className='cursor-pointer'>
                {isOpen[val.id] ?  <Minus className='sm:size-9' /> : <Plus  className=' sm:size-9'/>}
            </div>
            
             </div>
            
           { isOpen[val.id] && (  <div className='flex flex-col gap-10'>
            <div  className='border border-cyan mt-10 '/>
            <p className='mb-4 text-white text-sm sm:text-lg font-normal '>{val.description}</p>
            </div> )}


            </div> 

           
        ))}
      
    </div>
    </>
  )
}

export default WhyChooseUs