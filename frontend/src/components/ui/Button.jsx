// import React from "react";
// import { Link } from "react-router-dom";

// const Button = ({ value, className, href, onClick }) => {
//   return (
//     <button
//       to={href}
//       onClick={onClick}
//       className={`px-[12px] py-[6px] md:px-[50px] md:py-[11px] bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf] rounded-[6px] md:rounded-[10px] justify-center items-center gap-2 inline-flex text-black text-[12px] md:text-base font-medium md:font-semibold font-['Poppins'] leading-tight cursor-pointer ${className}`}
//     >
//       {value}
//     </button>
//   );
// };

// export default Button;

import React from "react";

const Button = ({
  value,
  className,
  href,
  onClick,
  variant = "default",
  size = "small",
}) => {
  const variants = {
    default: "bg-gradient-to-b from-[#def9fa] via-[#bef3f5] to-[#33bbcf]",
    dark: "bg-gradient-to-br from-[#272727] to-[#100f1c]",
    pink: "bg-gradient-to-b from-[#def9fa] via-[#e8bef5] to-[#cf33c7]",
    purple: "bg-gradient-to-b from-[#dfdefa] via-[#c8bef5] to-[#4f33cf]",
  };

  const sizes = {
    small: "px-[12px] py-[6px] text-[12px]",
    medium: "px-[50px] py-[11px] text-base",
    large: "px-[67px] py-[19px] text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded justify-center items-center gap-2 inline-flex font-['Poppins'] leading-tight cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
