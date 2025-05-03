import React from 'react'
import { IoIosHome } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { TbLibraryPlus } from "react-icons/tb";
import { NavLink } from 'react-router-dom';

function Sidebar({close}) {
  return (
    <div className={`sidebar-wrapper h-full w-48 bg-[var(--secondary-color)] max-sm:absolute max-sm:z-10 ${close ? "max-sm:hidden": "max-sm:''"} flex justify-center rounded-r-lg`}
>
          <div className="sidebar w-4/5 h-full pt-4">

            <NavLink 
            to="/"
            className={({isActive}) => `Home ${isActive ? "bg-[#504D4D]" : ""} hover:bg-[#504D4D]  rounded-md h-6 flex items-center justify-start cursor-pointer pl-4 mb-2`}>
              <div className="flex items-start justify-center gap-2">
                <IoIosHome color="var(--text-color1)" />
                <span className="text-[var(--text-color1)] text-sm">Home</span>
              </div>
            </NavLink>

            <NavLink 
            to="/profile"
            className={({isActive}) => `Home ${isActive ? "bg-[#504D4D]" : ""} hover:bg-[#504D4D] rounded-md h-6 flex items-center justify-start cursor-pointer pl-4 mb-2`}>
              <div className="flex items-start justify-center gap-2">
                <CgProfile color="var(--text-color1)" />
                <span className="text-[var(--text-color1)] text-sm">Profile</span>
              </div>
            </NavLink>
            
            <NavLink 
            to="/create"
            className={({isActive}) => `Home ${isActive ? "bg-[#504D4D]" : ""} hover:bg-[#504D4D] rounded-md h-6 flex items-center justify-start cursor-pointer pl-4 mb-2`}>
              <div className="flex items-start justify-center gap-2">
                <TbLibraryPlus color="var(--text-color1)" />
                <span className="text-[var(--text-color1)] text-sm">Create</span>
              </div>
            </NavLink>
          </div>
        </div>
  )
}

export default Sidebar