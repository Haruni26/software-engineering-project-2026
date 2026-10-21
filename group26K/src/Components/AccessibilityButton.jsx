/* @author Rakuzhuwo
/Add a functianility feature to allow the 
/button to be scaled to each page
/
*/
import React, { useState } from "react";
import AccessibilityTab from "./AccessibilityTab";
import { FiSettings } from "react-icons/fi"; // Using react-icons for a gear icon

const AccessibilityButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FiSettings size={24} />
      </button>

      {/* Accessibility Panel */}
      {isOpen && <AccessibilityTab />}
    </>
  );
};

export default AccessibilityButton;
