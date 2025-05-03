import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../appwrite/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

function Header({ onToggleSidebar }) {
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  return (
    <div className="header-wrapper w-vw h-14 bg-[var(--secondary-color)] flex items-center px-5">
      <div className="Header w-full flex justify-between">
        <div className="flex items-center gap-3">
        <div
            onClick={onToggleSidebar}
            className="hidden max-sm:flex hover:bg-[#504D4D] hover:rounded-xl h-6 w-6 justify-center items-center"
          >
            <GiHamburgerMenu color="var(--text-color1)"/>
          </div>
          <div className="logo font-semibold text-xl">
          <span className="text-[var(--primary-color)]">Ray</span>
          <span className="text-[var(--input-field)]">Blog</span>
        </div>
        </div>
        
        <div className="nav-buttons">
          {user ? (
            <button
              onClick={logoutUser}
              className="bg-[var(--text-color1)] text-sm font-semibold h-7 w-16 rounded-3xl ml-3"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/register">
                <button className="bg-[var(--primary-color)] text-[var(--text-color1)] text-sm h-7 w-16 rounded-3xl">
                  Sign up
                </button>
              </Link>
              <Link to="/login">
                <button className="bg-[var(--text-color1)] text-sm font-semibold h-7 w-16 rounded-3xl ml-3">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
