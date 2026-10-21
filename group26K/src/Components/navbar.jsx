/**
 * @file Navbar.jsx
 * @description A React functional component that serves as the navigation bar for the application, including dark mode toggle, navigation links, and social media integration.
 * The component also includes a weather widget and responsive design for different screen sizes.
 *
 * @module Navbar
 *
 * @author Raish Raj Joshi
 *         Tania Terence - Murf AI text to speech, and footer for the website.
 */

import { useRef, useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaMoon,
  FaUser,
  FaFacebook,
  FaYoutube,
} from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import Weather from "./Weather";

/**
 * Navbar Component
 * @description Displays a responsive navigation bar with dark mode toggle, weather widget, and links to application pages.
 * Includes a mobile-friendly menu and tooltips for additional accessibility.
 * @returns {JSX.Element} The Navbar component.
 *
 * @author Raish Raj Joshi
 */
export default function Navbar() {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navRef = useRef(); // Reference for responsive navigation
  const [location, setLocation] = useState({ lat: null, lon: null }); // State for location (default: St. Margarets Bay area)

  // Default coordinates for St. Margarets Bay area
  const DEFAULT_LATITUDE = 44.694267;
  const DEFAULT_LONGITUDE = -63.911099;

  // Side effects for toggling dark mode and setting default location
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setLocation({ lat: DEFAULT_LATITUDE, lon: DEFAULT_LONGITUDE });
  }, [darkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Function to show/hide responsive navigation menu
  const showNavbar = () => {
    if (navRef.current) {
      navRef.current.classList.toggle("responsive_nav");
    }
  };

  return (
    <div>
      {/* Header Container */}
      <header className="flex items-center justify-between h-20 px-6 bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text transition-colors duration-300">
        {/* Weather Widget */}
        <div className="text-light-primary dark:text-dark-primary flex items-center space-x-2">
          {location.lat !== null && location.lon !== null ? (
            <Weather lat={location.lat} lon={location.lon} />
          ) : (
            <p>Loading weather...</p>
          )}
        </div>

        {/* Navigation Links */}
        <nav
          ref={navRef}
          className="flex flex-col lg:flex-row space-x-0 lg:space-x-10 fixed lg:relative inset-0 lg:inset-auto lg:w-auto items-center justify-center bg-light-background dark:bg-dark-background lg:bg-transparent dark:lg:bg-transparent z-50"
        >
          <CustomLink to="/" showNavbar={showNavbar}>
            Home
          </CustomLink>
          <CustomLink to="/about" showNavbar={showNavbar}>
            About
          </CustomLink>
          <CustomLink to="/ecosystem" showNavbar={showNavbar}>
            Ecosystem
          </CustomLink>
          <CustomLink to="/gallery" showNavbar={showNavbar}>
            Gallery
          </CustomLink>
          <CustomLink to="/naturalburial" showNavbar={showNavbar}>
            Natural Burial
          </CustomLink>
          <CustomLink to="/contacts" showNavbar={showNavbar}>
            Contact
          </CustomLink>
          <CustomLink to="/map" showNavbar={showNavbar}>
            Map
          </CustomLink>
          <button
            className="nav-btn nav-close-btn text-light-primary dark:text-dark-primary lg:hidden"
            onClick={showNavbar}
          >
            <FaTimes size={28} />
          </button>
        </nav>

        {/* Right Side Controls */}
        <div className="flex items-center space-x-4">
          {/* Dark Mode Toggle Button */}
          <button
            className="w-12 h-12 bg-light-background dark:bg-dark-background rounded-full text-light-text dark:text-dark-text flex items-center justify-center transition-all duration-300 hover:scale-110"
            onClick={toggleDarkMode}
          >
            {darkMode ? <BsSunFill size={24} /> : <FaMoon size={24} />}
          </button>

          {/* User Icon with Tooltip */}
          <div className="relative">
            <div className="group flex items-center justify-center w-12 h-12 bg-transparent cursor-pointer">
              <FaUser
                size={28}
                className="text-light-primary dark:text-dark-primary"
              />
              <span className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 text-sm text-white bg-black dark:bg-gray-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                Login or Sig  nUp
              </span>
            </div>
          </div>
        </div>

        {/* Mobile View: Hamburger Menu */}
        <button
          className="nav-btn lg:hidden text-light-primary dark:text-dark-primary hover:scale-110"
          onClick={showNavbar}
        >
          <FaBars size={28} />
        </button>
      </header>
    </div>
  );
}

/**
 * Footer Component
 * @description Displays a footer with social media links, address, and copyright information.
 * @returns {JSX.Element} The Footer component.
 *
 * @author Tania Terence
 */
function Footer() {
  return (
    <footer className="bg-light-background dark:bg-gray-800 text-light-text dark:text-dark-text transition-colors duration-300 border-t-[2px] border-light-border dark:border-dark-border w-screen">
      <div className="flex items-center justify-between pl-4 sm:px-6 py-4">
        {/* Social Media Links */}
        <div className="flex gap-4">
          <a href="https://www.facebook.com/StMargaretsBayStewardshipAssociation/">
            <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
              <FaFacebook className="fill-[#1c1f26]" size={25} />
            </button>
          </a>
          <a href="https://www.instagram.com/stmargaretsbaysa/">
            <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
              <FaSquareInstagram className="fill-[#1c1f26]" size={25} />
            </button>
          </a>
          <a href="https://www.youtube.com/watch?v=hhed9dEyfVU&list=PLsIXMc3B__c2jg_yjIN1E9HMuRwEnMMuS&pp=iAQB">
            <button className="relative bg-white p-2 rounded-full hover:ring-2 hover:ring-gray-200 transition-all duration-200">
              <FaYoutube className="fill-[#1c1f26]" size={25} />
            </button>
          </a>
        </div>
        {/* Address and Copyright */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pr-[15px] w-[170px] sm:w-[900px]">
          <p className="text-[12px] sm:text-sm">
            Head Of St Margarets Bay, NS B3Z 2C9
          </p>
          <p className="text-[10px] sm:text-xs">
            &copy; 2024 SMU, CSCI 3428 Group25G
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * CustomLink Component
 * @description Creates navigation links with active state styling and hover effects.
 * @param {Object} props - Properties for the CustomLink component.
 * @returns {JSX.Element} A styled navigation link.
 *
 * @author Raish Raj Joshi
 */
function CustomLink({ to, children, showNavbar, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <Link
      to={to}
      className={`relative px-4 py-2 transition-all duration-200 ${
        isActive
          ? "bg-light-highlight dark:bg-dark-highlight text-white rounded-lg"
          : "text-light-text dark:text-dark-text hover:text-light-primary dark:hover:text-dark-primary"
      } hover:scale-105`}
      onClick={showNavbar}
      {...props}
    >
      {children}
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-light-primary dark:bg-dark-primary transition-all duration-300 hover:w-full"></span>
    </Link>
  );
}

export { Footer, Navbar };
