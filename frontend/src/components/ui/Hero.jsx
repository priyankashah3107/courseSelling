import { useNavigate } from "react-router-dom";
import styles from "../../style";
import Button from "./Button";

function Hero() {
  let navigate = useNavigate();
  const allCourses = () => {
    navigate("/allcourses");
  };
  const signup = () => {
    navigate("/signup");
  };
  const cards = [
    {
      id: 1,
      title: "Web Designing",
      img: "/uiux.png",
      description:
        "Transforming your vision into stunning, user-friendly websites that captivate and convert. Let's build a digital experience your customers will love!",
      creatorName: "Harkirat Singh",
      button: <Button value={"₹ 999"} variant="pink" size="small" />,
    },
    {
      id: 2,
      title: "Web Development",
      img: "/development.png",
      description:
        "Creating powerful, seamless websites that elevate your brand and engage users. Let’s turn your ideas into exceptional online experiences!",
      creatorName: "Harkirat Singh",
      button: <Button value={"₹ 3999"} variant="pink" size="small" />,
    },
    {
      id: 3,
      title: "Artificial Intelligence",
      img: "/ai.png",
      description:
        "Harnessing the power of AI to deliver smart, efficient, and innovative solutions. Transforming data into decisions for a smarter future!",
      creatorName: "Harkirat Singh",
      button: <Button value={"₹ 2999"} variant="pink" size="small" />,
    },
  ];
  return (
    <>
      <section
        id="home"
        className={`flex md:flex-row flex- col justify-center items-center text-center relative   `}
      >
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] size-[80%] bottom-40 rounded-full white__gradient" />
        <div className="absolute z-[0] size-[50%] right-20 bottom-20 blue__gradient" />
        <div
          className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6`}
        >
          <div className="flex flex-row items-center px-3 py-1.5  md:py-[6px] md:px-4 bg-discount-gradient rounded-[10px] mb-2 mt-10 md:mt-14  ">
            {/* <img src={discount} alt="discount" className={`size-32px`} /> */}

            <p className={`${styles.paragraph} justify-center items-center `}>
              <span className={`${styles.textWhite}`}>
                {" "}
                Master New Skills Anytime, Anywhere{" "}
              </span>
            </p>
          </div>

          <div className="flex flex-row justify-between items-center w-full onScroll">
            <h1 className="flex-1 font-poppins font-semibold text-[24px] ss:text-[72px] md:text-[54px]  ss:leading-[100px] leading-75px mt-4 md:mt-6">
              Your Path to <span className="text-gradient">Career Growth</span>
              <br className="sm:block hidden" />{" "}
              <span className="">Starts Here</span>
            </h1>
            {/* <div className="ss:flex hidden md:mr-4 mr-0">
              <GetStarted />
            </div> */}
          </div>

          <p
            className={`${styles.paragraph} max-w-5xl md:w-screen mt-5 text-center items-center`}
          >
            Discover expert-led courses designed to help you gain in-demand
            skills, earn valuable certifications, and unlock new career
            opportunities. Start your journey today!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-8 mt-10">
            <Button
              value={"Start learning"}
              variant="default"
              size="large"
              className={`text-black font-semibold`}
              onClick={signup}
            />
            <Button
              value={"Explore course"}
              variant="dark"
              size="large"
              onClick={allCourses}
              className={`text-white font-semibold hover:bg-[#111111]`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
