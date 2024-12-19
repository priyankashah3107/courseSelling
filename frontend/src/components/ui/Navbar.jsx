import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex flex-row justify-between mx-auto p-10  max-w-">
        <h1>TeachPoint</h1>

        <div>
          <button>Signup</button>
          <button>Login</button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
