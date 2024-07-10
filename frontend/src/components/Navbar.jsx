import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [menuOpen,setMenuOpen]=useState(false);
  return (
    <nav
      className="
          flex flex-wrap
          items-center
          justify-between
          w-full
          py-4
          md:py-0
          px-4
          text-lg text-gray-700
          bg-white
        "
    >
      <div className="text-lg font-semibold text-blue-900">
        Book Review Assignment
      </div>

      <svg
        onClick={()=>{setMenuOpen(!menuOpen)}}
        xmlns="http://www.w3.org/2000/svg"
        id="menu-button"
        className="h-6 w-6 cursor-pointer md:hidden block"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>

      <div className={`${menuOpen?"":"hidden"} w-full md:flex md:items-center md:w-auto`} id="menu">
        <ul
          className="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
        >
          <Link to="/userDashboard">
            <span className="md:p-4 py-2 block hover:text-purple-400" href="#">
              Dashboard
            </span>
          </Link>
          <Link to="/addNewBook">
            <span className="md:p-4 py-2 block hover:text-purple-400" href="#">
              Add new Book
            </span>
          </Link>
          <Link to="/bookListing">
            <span className="md:p-4 py-2 block hover:text-purple-400" href="#">
              Book Listing
            </span>
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
