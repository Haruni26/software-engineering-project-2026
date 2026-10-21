// src/components/Navbar.jsx
import { useEffect, useState } from "react";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { FaMoon, FaSun, FaFacebook, FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";

// ---- Navbar ----
export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    // prefer saved theme, then system preference
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-black/10 dark:border-white/10">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link to="/" className="font-semibold tracking-wide">
          Woodland
        </Link>

        <ul className="hidden md:flex items-center gap-6 text-sm">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/ecosystem">Ecosystem</NavItem>
          <NavItem to="/gallery">Gallery</NavItem>
          <NavItem to="/naturalburial">Natural Burial</NavItem>
          <NavItem to="/map">Map</NavItem>
          <NavItem to="/contacts">Contact</NavItem>
        </ul>

        <button
          onClick={toggleTheme}
          aria-label="Toggle light and dark mode"
          className="ml-4 inline-flex items-center gap-2 rounded-md border border-black/10 dark:border-white/20 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10 transition"
          title="Light/Dark"
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
          <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </nav>
    </header>
  );
}


// Helper to get active link styling that matches your Tailwind scheme
function NavItem({ to, children }) {
  const resolved = useResolvedPath(to);
  const isActive = useMatch({ path: resolved.pathname, end: true });
  return (
    <li>
      <Link
        to={to}
        className={`hover:opacity-70 ${
          isActive ? "font-medium underline underline-offset-4" : ""
        }`}
      >
        {children}
      </Link>
    </li>
  );
}

/* ---- (Optional) Footer kept here so existing imports don't break ---- */
export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 transition-colors duration-300 border-t border-black/10 dark:border-white/10 w-screen">
      <div className="flex items-center justify-between pl-4 sm:px-6 py-4">
        {/* Socials */}
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
        {/* Address / copyright */}
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pr-[15px] w-[170px] sm:w-[900px]">
          <p className="text-[12px] sm:text-sm">Head Of St Margarets Bay, NS B3Z 2C9</p>
          <p className="text-[10px] sm:text-xs">&copy; 2024 SMU, CSCI 3428 Group25G</p>
        </div>
      </div>
    </footer>
  );
}
