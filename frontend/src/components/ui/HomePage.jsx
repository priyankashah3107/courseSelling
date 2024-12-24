import React from "react";
import styles from "../../style";
import Navbar from "./Navbar";
import Hero from "./Hero";

const HomePage = () => {
  return (
    <div className=" bg-primary h-screen  w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth} ${styles.textWhite}`}>
          <Navbar />
        </div>
      </div>

      <div className={` bg-primary ${styles.flexStart}`}>
        <div className={` ${styles.boxWidth} ${styles.textWhite}`}>
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
