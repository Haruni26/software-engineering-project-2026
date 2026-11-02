import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/css/index.css";
import { LandingPage } from "./pages/landing";
import { Header } from "./components/header";

const root = document.getElementById("root");

createRoot(root!).render(
  <StrictMode>
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </Router>
  </StrictMode>,
);
