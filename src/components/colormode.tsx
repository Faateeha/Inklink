'use client';
import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ColorModeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Check for dark mode in the componentDidMount lifecycle
    setIsDarkMode(document.documentElement.classList.contains("dark"));
  }, []);

  const toggleColorMode = () => {
    document.documentElement.classList.toggle("dark");
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleColorMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 focus:outline-none"
    >
      {isDarkMode ? (
        <FaSun className="h-6 w-6 text-yellow-400" />
      ) : (
        <FaMoon className="h-6 w-6 text-gray-500" />
      )}
    </button>
  );
};

export default ColorModeToggle;

