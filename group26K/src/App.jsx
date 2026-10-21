/**
 * @file App.js
 * @description The main application entry point that renders the Navbar and manages routes for various pages of the Woodland Conservation Site.
 * @author Raish Raj Joshi
 */

import React from "react";
import { Footer } from "./Components/navi"; // Footer and Navbarr from the Components folder.
import  Navbar  from "./Components/navi";
import Home from "./pages/Home"; // Home page component.
import About from "./pages/About"; // About page component.
import Ecosystem from "./pages/Ecosystem"; // Ecosystem page component.
import Gallery from "./pages/Gallery"; // Gallery page component.
import NaturalBurial from "./pages/NaturalBurial"; // Natural Burial page component.
import Contact from "./pages/Contact"; // Contact page component.
import MapView from "./pages/MapView";
import { Route, Routes } from "react-router-dom"; // Routing utilities from react-router-dom.
import AccessibilityButton from "./Components/AccessibilityButton";
/**
 * @function App
 * @description The main React component that defines the structure of the application.
 * It includes a navigation bar, footer, and routing for various site pages.
 *
 * @returns {JSX.Element} - The rendered application structure.
 */
function App() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      {" "}
      {/* Container for the entire application */}
      {/* Navbar */}
      <Navbar />
       {/* Displays the navigation bar */}
      {/* Main Content */}
      <main className="flex-grow">
        {" "}
        {/* Main area for routing different pages */}
        <Routes>
          {" "}
          {/* Define application routes */}
          <Route path="/" element={<Home />} /> 
          {/* Route for the Home page */}
          <Route path="/about" element={<About />} />{" "}
          {/* Route for the About page */}
          <Route path="/gallery" element={<Gallery />} />{" "}
          {/* Route for the Gallery page */}
          <Route path="/ecosystem" element={<Ecosystem />} />{" "}
          {/* Route for the Ecosystem page */}
          <Route path="/NaturalBurial" element={<NaturalBurial />} />{" "}
          {/* Route for the Natural Burial page */}
          <Route path="/contacts" element={<Contact />} />{" "}
          {/* Route for the Contact page */}
          <Route path="/map" element={<MapView />} />{" "}
          {/* Route for the Map page */}
        </Routes>
      </main>
      <AccessibilityButton/>
      {/* Footer */}
      <Footer /> {/* Displays the footer */}
    </div>
  );
}

export default App;
