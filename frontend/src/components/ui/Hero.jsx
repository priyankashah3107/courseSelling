import styles from "../../style";

function Hero() {
  return (
    <>
      <section
        id="home"
        className={`flex md:flex-row flex- col justify-center items-center text-center relative  `}
      >
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient" />
        <div className="absolute z-[1] size-[80%] bottom-40 rounded-full white__gradient" />
        <div className="absolute z-[0] size-[50%] right-20 bottom-20 blue__gradient" />
        <div
          className={`flex-1 ${styles.flexCenter} flex-col xl:px-0 sm:px-16 px-6`}
        >
          <div className="flex flex-row items-center px-3 py-1.5  md:py-[6px] md:px-4 bg-discount-gradient rounded-[10px] mb-2 ">
            {/* <img src={discount} alt="discount" className={`size-32px`} /> */}

            <p className={`${styles.paragraph} justify-center items-center `}>
              <span className={`${styles.textWhite}`}>
                {" "}
                Master New Skills Anytime, Anywhere{" "}
              </span>
            </p>
          </div>

          <div className="flex flex-row justify-between items-center w-full">
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
        </div>
      </section>
    </>
  );
}

export default Hero;
