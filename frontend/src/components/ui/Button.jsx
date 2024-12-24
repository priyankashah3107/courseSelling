import React from "react";
import { Link } from "react-router-dom";

const Button = ({ value, className, href, onClick }) => {
  return (
    <button
      to={href}
      onClick={onClick}
      className={`px-[12px] py-[6px] md:px-[50px] md:py-[11px] bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] rounded-[6px] md:rounded-[10px] justify-center items-center gap-2 inline-flex text-black text-[12px] md:text-base font-medium md:font-semibold font-['Poppins'] leading-tight cursor-pointer ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
