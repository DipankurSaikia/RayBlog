import React from "react";
import { IoSearch } from "react-icons/io5";

function Herotop() {
  return (
    <div className="Hero-top-wrapper bg-[var(--secondary-color)] h-28 rounded-md flex justify-center items-center mb-4">
      <div className="search-wrapper">
        <div className="bg-[var(--input-field)] h-8 w-full max-w-md md:max-w-lg lg:max-w-xl rounded-3xl flex items-center px-4 gap-2">
          <IoSearch className="text-gray-500" />
          <input
            type="text"
            className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400"
            placeholder="Search..."
          />
        </div>
      </div>
    </div>
  );
}

export default Herotop;
