/* @author Rakhuzuwo
/ Added functianilty to the button by allow for dark mode,
/line spacing, and font size inscrease
*/
import React, { useEffect, useState } from "react";

const AccessibilityTab = () => {
  // Load saved settings from localStorage or fallback to defaults
  const [textSize, setTextSize] = useState(localStorage.getItem("textSize") || "medium");
  const [contrast, setContrast] = useState(localStorage.getItem("contrast") || "default");
  const [lineSpace, setLineSpace] = useState(localStorage.getItem("lineSpace") || "default");

  useEffect(() => {
    const html = document.documentElement;

    //  Apply TEXT SIZE classes
    html.classList.remove("text-small", "text-medium", "text-large", "text-massive");
    html.classList.add(`text-${textSize}`);

    // ⚡ Apply CONTRAST classes
    html.classList.remove("contrast-default", "contrast-dark", "contrast-greyscale", "contrast-inverted");
    html.classList.add(`contrast-${contrast}`);

    // ⚡ Sync with Tailwind's built-in dark mode toggle
    if (contrast === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // ⚡ Apply LINE SPACING classes
    html.classList.remove("linespace-default", "linespace-2", "linespace-3", "linespace-4");
    html.classList.add(`linespace-${lineSpace}`);

    // 💾 Save user preferences so they persist on reload
    localStorage.setItem("textSize", textSize);
    localStorage.setItem("contrast", contrast);
    localStorage.setItem("lineSpace", lineSpace);
  }, [textSize, contrast, lineSpace]); // Re-run effect whenever these change

  return (
    <div className="fixed bottom-20 right-4 p-4 bg-white dark:bg-gray-800 text-black dark:text-white shadow-lg rounded-lg z-50 w-64">
      <h3 className="font-bold mb-2">Accessibility Settings</h3>

      {/* =======================
          TEXT SIZE SELECTOR
         ======================= */}
      <label className="block mb-1">Text Size:</label>
      <select
        value={textSize}
        onChange={(e) => setTextSize(e.target.value)}
        className="mb-2 border rounded p-1 w-full bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="massive">Massive</option>
      </select>

      {/* =======================
          CONTRAST SELECTOR
         ======================= */}
      <label className="block mb-1">Contrast:</label>
      <select
        value={contrast}
        onChange={(e) => setContrast(e.target.value)}
        className="mb-2 border rounded p-1 w-full bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="default">Default</option>
        <option value="dark">Dark Mode</option>
        <option value="greyscale">Grey Scale Mode</option>
        <option value="inverted">Inverted</option>
      </select>

      {/* =======================
          LINE SPACING SELECTOR
         ======================= */}
      <label className="block mb-1">Line Spacing:</label>
      <select
        value={lineSpace}
        onChange={(e) => setLineSpace(e.target.value)}
        className="mb-2 border rounded p-1 w-full bg-white dark:bg-gray-700 text-black dark:text-white"
      >
        <option value="default">Default</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
};

export default AccessibilityTab;
