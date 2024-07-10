import React, { useState } from "react";

const Navbar = () => {
    const [menuOpen,setMenuOpen]=useState(false);
  return (
    <nav
      class="
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
        class="h-6 w-6 cursor-pointer md:hidden block"
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

      <div class={`${menuOpen?"":"hidden"} w-full md:flex md:items-center md:w-auto`} id="menu">
        <ul
          class="
              pt-4
              text-base text-gray-700
              md:flex
              md:justify-between 
              md:pt-0"
        >
          <li>
            <span class="md:p-4 py-2 block hover:text-purple-400" href="#">
              Dashboard
            </span>
          </li>
          <li>
            <span class="md:p-4 py-2 block hover:text-purple-400" href="#">
              Add new Book
            </span>
          </li>
          <li>
            <span class="md:p-4 py-2 block hover:text-purple-400" href="#">
              Book Listing
            </span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
