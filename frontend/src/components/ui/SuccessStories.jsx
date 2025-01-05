// import { Quote, TextQuoteIcon } from 'lucide-react'
// import React from 'react'

// const testimonials = [
//     {
//         id: 1,
//         story: "🚀 Thrilled to announce that I've joined a remote startup as a Full Stack Intern! A huge thanks to @kirat_tw's 0-100 Cohort 2 and @akshaymarch7's Namaste React. OG teachers with OG courses.",
//         stu_name: "ABC",
//          twitterId: "ABC"
        
//     },
//     {
//         id: 2,
//         story: "Just received my very first freelance payment All thanks to @kirat_tw and @100xDevs #100xDevs #cohort2",
//         stu_name: "XYZ",
//         twitterId: "XYZ"
        
//     },
//     {
//         id: 3,
//         story: "things that have happened since joining @kirat_tw cohort 2 (not 3) - got into gsoc - working as product manager at $1.25 B Startup (work culture is actually start-up like and learning a lot)",
//         stu_name: "ABC",
//          twitterId: "XYZ"
        
//     },
//     {
//         id: 4,
//         story: "🚀 Thrilled to announce that I've joined a remote startup as a Full Stack Intern! A huge thanks to @kirat_tw's 0-100 Cohort 2 and @akshaymarch7's Namaste React. OG teachers with OG courses.",
//         stu_name: "XYZ",
//         twitterId: "XYZ"
        
//     },
//     {
//         id: 5,
//         story: "Just received my very first freelance payment All thanks to @kirat_tw and @100xDevs #100xDevs #cohort2",
//         stu_name: "ABC",
//          twitterId: "XYZ"
        
//     },
//     {
//         id: 6,
//         story: "things that have happened since joining @kirat_tw cohort 2 (not 3) - got into gsoc - working as product manager at $1.25 B Startup (work culture is actually start-up like and learning a lot)",
//         stu_name: "XYZ", 
//         twitterId: "XYZ"
        
//     },
    


// ]

// const SuccessStories = () => {
//   return (
//     <div>
//       <h1 className=" text-white text-[20px] mt-20 md:mt-32 md:text-[50px] font-semibold font-['Poppins'] leading-[30px] md:leading-[65px]">See how learning leads to success.</h1>

//       <div className='max-w-5xl grid grid-cols-1 sm:grid-cols-3 gap-8 '>
//         {testimonials.map((val, index) => (
//             <div key={index} className="border border-[#26D0CE] w-[300px] h-auto p-8 rounded-2xl mt-10 md:mt-32  "> 
//             {/* case-slide or case-slide-reverse */}
               
//                <div className=''>
//                 <img src={"/Vector.svg"} alt='quote' className=''/>
//                 <p className='mt-6'>{val.story}</p>
//                </div>
//                 <p className='mt-4'>{val.stu_name}</p>

//                 <div className='flex flex-row gap-4 mt-4'>
//                     <img src={"/twitter.svg"} alt='x'/>
//                     <p>{val.twitterId}</p>
//                 </div>
 
//             </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default SuccessStories


import { Quote, TextQuoteIcon } from 'lucide-react';
import React from 'react';

const testimonials = [
    {
        id: 1,
        story: "🚀 Thrilled to announce that I've joined a remote startup as a Full Stack Intern! A huge thanks to @kirat_tw's 0-100 Cohort 2 and @akshaymarch7's Namaste React. OG teachers with OG courses.",
        stu_name: "ABC",
        twitterId: "ABC"
    },
    {
        id: 2,
        story: "Just received my very first freelance payment All thanks to @kirat_tw and @100xDevs #100xDevs #cohort2",
        stu_name: "XYZ",
        twitterId: "XYZ"
    },
    {
        id: 3,
        story: "things that have happened since joining @kirat_tw cohort 2 (not 3) - got into gsoc - working as product manager at $1.25 B Startup (work culture is actually start-up like and learning a lot)",
        stu_name: "ABC",
        twitterId: "XYZ"
    },
    {
        id: 4,
        story: "🚀 Thrilled to announce that I've joined a remote startup as a Full Stack Intern! A huge thanks to @kirat_tw's 0-100 Cohort 2 and @akshaymarch7's Namaste React. OG teachers with OG courses.",
        stu_name: "XYZ",
        twitterId: "XYZ"
    },
    {
        id: 5,
        story: "Just received my very first freelance payment All thanks to @kirat_tw and @100xDevs #100xDevs #cohort2",
        stu_name: "ABC",
        twitterId: "XYZ"
    },
    {
        id: 6,
        story: "things that have happened since joining @kirat_tw cohort 2 (not 3) - got into gsoc - working as product manager at $1.25 B Startup (work culture is actually start-up like and learning a lot)",
        stu_name: "XYZ",
        twitterId: "XYZ"
    },
];

const SuccessStories = () => {
  return (
    <div>
      <h1 className="text-white text-2xl md:text-5xl font-semibold font-['Poppins'] leading-tight md:leading-[65px] mt-20 md:mt-32">
        See how learning leads to success.
      </h1>

      <div className='max-w-5xl mx-auto px-4 sm:px-6 md:px-8 mt-16'>
        {/* Grid layout for testimonials */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials.map((val, index) => (
            <div key={index} className=" border border-[#26D0CE] p-6 rounded-2xl shadow-lg flex flex-col justify-between">
              {/* Quote icon and story */}
              <div className="flex flex-col items-center">
                <img src="/Vector.svg" alt="quote" className="w-12 h-12" />
                <p className="mt-6 text-center text-sm md:text-base">{val.story}</p>
              </div>

              {/* Student name */}
              <p className="mt-4 text-center font-semibold text-lg">{val.stu_name}</p>

              {/* Twitter handle */}
              <div className="flex justify-center items-center gap-2 mt-4">
                <img src="/twitter.svg" alt="twitter-icon" className="w-5 h-5" />
                <p className="text-sm text-gray-600">{val.twitterId}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
