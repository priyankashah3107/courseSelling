import React from "react";
import Navbar from "./components/ui/Navbar";
import styles from "./style";
import Hero from "./components/ui/Hero";

const App = () => {
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

export default App;
