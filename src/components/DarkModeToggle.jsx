import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from './path/to/your/darkModeSlice'; // Sesuaikan path

const DarkModeToggle = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode.darkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <button 
        onClick={handleToggle} 
        className="p-2 bg-blue-500 text-white rounded-md">
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>
      <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <p className="p-4">
          {darkMode ? 'Dark mode is enabled' : 'Light mode is enabled'}
        </p>
      </div>
    </div>
  );
};

export default DarkModeToggle;
