import React from "react";
import { Link } from "react-router-dom";

const HeaderButton: React.FC = () => {
  return (

    //
    <Link to="/pricing">
      <button className="py-[2px] px-[3px] lg:py-3 lg:px-6 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
        Buy Premium Access
      </button>
    </Link>
  );
};

export default HeaderButton;
