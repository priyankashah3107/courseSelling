// import React from "react";
// import styles from "../../style";
// import Navbar from "./Navbar";
// import Hero from "./Hero";
// import AllCourses from "./AllCourses";
// import Button from "./Button";
// import { useNavigate } from "react-router-dom";
// import WhyChooseUs from "./WhyChooseUs";
// import SuccessStories from "./SuccessStories";

// const cards = [
//   {
//     id: 1,
//     title: "Web Designing",
//     img: "/uiux.png",
//     description:
//       "Transforming your vision into stunning, user-friendly websites that captivate and convert. Let's build a digital experience your customers will love!",
//     creatorName: "Harkirat Singh",
//     button: <Button value={"Explore Now"} variant="pink" size="small" />,
//   },
//   {
//     id: 2,
//     title: "Web Development",
//     img: "/development.png",
//     description:
//       "Creating powerful, seamless websites that elevate your brand and engage users. Let’s turn your ideas into exceptional online experiences!",
//     creatorName: "Harkirat Singh",
//     button: <Button value={"Explore Now"} variant="default" size="small" />,
//   },
//   {
//     id: 3,
//     title: "Artificial Intelligence",
//     img: "/ai.png",
//     description:
//       "Harnessing the power of AI to deliver smart, efficient, and innovative solutions. Transforming data into decisions for a smarter future!",
//     creatorName: "Harkirat Singh",
//     button: <Button value={"Explore Now"} variant="purple" size="small" />,
//   },
// ];
// const HomePage = () => {
//   let navigate = useNavigate();

//   const mycourse = () => {
//     navigate("/allcourses");
//   };

//   return (
//     <div className=" bg-primary h-screen  w-full overflow-scroll onScroll">
//       <div className={`${styles.paddingX} ${styles.flexCenter}`}>
//         <div className={`${styles.boxWidth} ${styles.textWhite}`}>
//           <Navbar />
//         </div>
//       </div>

//       <div className={` bg-primary ${styles.flexStart}`}>
//         <div className={` ${styles.boxWidth} ${styles.textWhite}`}>
//           <Hero />
//         </div>
//       </div>
//       <div className={`bg-primary  ${styles.paddingX} ${styles.flexCenter}  `}>
//         <div className={` ${styles.textWhite} flex flex-col    `}>
//           <Button
//             value={"Courses"}
//             size="large"
//             variant="dark"
//             className={`font-semibold mb-14 mt-20 md:mt-32 mx-auto  `}
//           />
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mx-auto gap-14 ">
//             {cards.map((val, index) => (
//               // later convert this in Link so i will redirect with dynamic ID
//               <div
//                 key={index}
//                 className="max-w-80 w-[377px] h-[334px] bg-gray-gradient p-5 rounded-md cursor-pointer"
//                 onClick={mycourse}
//               >
//                 <img
//                   src={val.img}
//                   alt="image"
//                   className="w-[117px] h-[117px] rounded-lg mb-4"
//                 />
//                 <div className="flex flex-col gap-2">
//                   <h1 className="text-white text-sm sm:text-md font-semibold font-['Poppins'] leading-snug tracking-tight">
//                     {val.title}
//                   </h1>
//                   <p className="text-white text-[10px] sm:text-[12px] font-normal font-['Poppins'] sm:leading-[16px]">
//                     {val.description}
//                   </p>
//                 </div>

//                 <div className="flex flex-row justify-between gap-2 mt-4">
//                   <h2 className="text-white text-xs font-bold font-['Poppins'] leading-tight tracking-tight">
//                     {val.creatorName}
//                   </h2>
//                   <button className="text-black">{val.button}</button>
//                 </div>
//               </div>
//             ))}
           
//           </div>
//           <WhyChooseUs />
//           <SuccessStories />
//         </div>
//       </div>



      
//     </div>
//   );
// };

// export default HomePage;


import React, { useEffect, useRef, useState } from "react";
import styles from "../../style";
import Navbar from "./Navbar";
import Hero from "./Hero";
import AllCourses from "./AllCourses";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import WhyChooseUs from "./WhyChooseUs";
import SuccessStories from "./SuccessStories";
import Footer from "./Footer";

const cards = [
  {
    id: 1,
    title: "Web Designing",
    img: "/uiux.png",
    description:
      "Transforming your vision into stunning, user-friendly websites that captivate and convert. Let's build a digital experience your customers will love!",
    creatorName: "Harkirat Singh",
    button: <Button value={"Explore Now"} variant="pink" size="small" />,
  },
  {
    id: 2,
    title: "Web Development",
    img: "/development.png",
    description:
      "Creating powerful, seamless websites that elevate your brand and engage users. Let’s turn your ideas into exceptional online experiences!",
    creatorName: "Harkirat Singh",
    button: <Button value={"Explore Now"} variant="default" size="small" />,
  },
  {
    id: 3,
    title: "Artificial Intelligence",
    img: "/ai.png",
    description:
      "Harnessing the power of AI to deliver smart, efficient, and innovative solutions. Transforming data into decisions for a smarter future!",
    creatorName: "Harkirat Singh",
    button: <Button value={"Explore Now"} variant="purple" size="small" />,
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const [inView, setInView] = useState(false);

  // Observer logic to detect when the component comes into view
  const observer = useRef(null);

  const mycourse = () => {
    navigate("/allcourses");
  };

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("onScroll");
          } else {
            entry.target.classList.remove("onScroll");
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.current.observe(el));

    return () => {
      elements.forEach((el) => observer.current.unobserve(el));
    };
  }, []);

  return (
    <div className="bg-primary h-screen w-full overflow-scroll ">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} ${styles.textWhite}`}>
          <Navbar />
        </div>
      </div>

      <div className={`${styles.flexStart} bg-primary `} >
        <div className={`${styles.boxWidth} ${styles.textWhite}`}>
          <Hero />
        </div>
      </div>

      <div className={`${styles.paddingX} ${styles.flexCenter} bg-primary`}>
        <div className="text-white flex flex-col">
          <Button
            value={"Courses"}
            size="large"
            variant="dark"
            className="font-semibold mb-14 mt-20 md:mt-32 mx-auto"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center mx-auto gap-14">
            {cards.map((val, index) => (
              <div
                key={index}
                className="max-w-80 w-[377px] h-[334px] bg-gray-gradient p-5 rounded-md cursor-pointer animate-on-scroll"
                onClick={mycourse}
              >
                <img
                  src={val.img}
                  alt="image"
                  className="w-[117px] h-[117px] rounded-lg mb-4"
                />
                <div className="flex flex-col gap-2">
                  <h1 className="text-white text-sm sm:text-md font-semibold font-['Poppins'] leading-snug tracking-tight">
                    {val.title}
                  </h1>
                  <p className="text-white text-[10px] sm:text-[12px] font-normal font-['Poppins'] sm:leading-[16px]">
                    {val.description}
                  </p>
                </div>

                <div className="flex flex-row justify-between gap-2 mt-4">
                  <h2 className="text-white text-xs font-bold font-['Poppins'] leading-tight tracking-tight">
                    {val.creatorName}
                  </h2>
                  <button className="text-black">{val.button}</button>
                </div>
              </div>
            ))}
          </div>

          <WhyChooseUs />
          <SuccessStories />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
