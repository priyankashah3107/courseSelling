import React from "react";
import { Link } from "react-router-dom";

const Button = ({ value, className, href, onClick }) => {
  return (
    <button
      to={href}
      onClick={onClick}
      className={`px-[30px] py-[9px] md:px-[50px] md:py-[11px] bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] rounded-[10px] justify-center items-center gap-2 inline-flex text-black text-base font-semibold font-['Poppins'] leading-tight cursor-pointer ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
