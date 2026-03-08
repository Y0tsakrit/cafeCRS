import React from "react";
import { Link, useLocation } from "react-router-dom";

function Subnav() {
  const location = useLocation();

  const navItem = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-xl text-sm font-medium transition
      ${
        location.pathname === path
          ? "bg-[#8337D9] text-white"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <div className="mt-4 px-2 md:px-4">
      <div
        className="flex flex-row md:flex-col gap-2 md:gap-3 
        bg-[#F5F5F5] rounded-2xl 
        px-3 py-3 md:px-5 md:py-6 
        w-full md:w-48 
        justify-center md:justify-start"
      >
        {navItem("/mainpage", "Main Page")}
        {navItem("/resetpassword", "Change Password")}
        {navItem("/history", "History")}
      </div>
    </div>
  );
}

export default Subnav;