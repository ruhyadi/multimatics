import React from "react";
import { NavLink } from "react-router-dom";

type NavbarProps = {
  title: string;
  links: { name: string; url: string }[];
};

const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">{title}</div>
        <div className="space-x-4">
          {links.map((link) => (
            <NavLink
              to={link.url}
              className={({ isActive }) =>
                isActive ? "text-white" : "text-gray-300 hover:text-white"
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
