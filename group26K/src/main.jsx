/**
 * @file index.js
 * @description Entry point for the React application. This file initializes the app and mounts it to the DOM.
 *
 * React functions and components are written to follow best practices, including meaningful naming, purpose documentation,
 * and inline comments where necessary.
 *
 * COTS (Commercial Off-The-Shelf Software):
 * - React: https://reactjs.org/
 * - ReactDOM: https://reactjs.org/docs/react-dom.html
 * - React Router: https://reactrouter.com/
 */

// Importing COTS libraries
import { createRoot } from "react-dom/client"; // React 18's version of ReactDOM
import { BrowserRouter } from "react-router-dom"; // Provides routing functionality for React applications

// Importing local components and styles
import App from "./App"; // Main application component
import "./index.css"; // Global CSS styles for the application
import 'leaflet/dist/leaflet.css';


/**
 * Purpose: Render the main React application inside the root DOM element, wrapping it with routing functionality.
 *
 * Parameters:
 * - None
 *
 * Pseudo-code:
 * 1. Import necessary libraries and components.
 * 2. Use ReactDOM to render the application.
 * 3. Wrap the App component with BrowserRouter to enable routing.
 * 4. Mount the rendered content to the DOM element with id "root".
 */

// Wrapping the App component with BrowserRouter to enable routing.
// ReactDOM.render mounts the App component to the DOM.
  const domNode = document.getElementById("root");
  const root = createRoot(domNode);
  root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
  )
 // Targeting the HTML element with id "root" as the mounting point
  
