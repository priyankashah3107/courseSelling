import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let navigate = useNavigate();
  const signin = () => {
    navigate("/signup");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <nav className="flex flex-row justify-between mx-auto p-6  max-w-5xl relative z-10 mb-10">
        <h1 className="text-white/80 text-sm  md:text-xl font-bold font-['Poppins'] leading-relaxed">
          Teach <span className="text-gradient">Point</span>
        </h1>

        <div className="flex flex-row md:gap-8 ">
          <Button
            value={"Signin"}
            className={`hidden md:block`}
            onClick={signin}
          />
          <Button value={"Login"} onClick={login} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
