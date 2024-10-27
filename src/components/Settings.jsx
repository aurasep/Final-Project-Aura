// src/components/Setting.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, setLanguage as setLanguageAction } from '../redux/settingsSlice';
import { FaGlobe } from 'react-icons/fa';

const Setting = () => {
    const dispatch = useDispatch();
    const darkMode = useSelector((state) => state.settings.darkMode);
    const selectedLanguage = useSelector((state) => state.settings.language);
    
    // Initialize local state with the selected language from Redux
    const [language, setLanguage] = useState(selectedLanguage);

    useEffect(() => {
        // Update local state when the selected language changes in Redux
        setLanguage(selectedLanguage);
    }, [selectedLanguage]);

    const handleLanguageChange = (e) => {
        const newLanguage = e.target.value;
        setLanguage(newLanguage); // Update local state
        dispatch(setLanguageAction(newLanguage)); // Dispatch action to change language in Redux
    };

    return (
        <div className={`p-8 rounded-lg shadow-lg max-w-xl mx-auto ${darkMode ? 'bg-gray-100 text-black' : 'bg-white text-black'}`}>
            <h1 className="text-3xl font-bold mb-6 text-center">Account Settings</h1>

            {/* Dark Mode Toggle */}
            <div className="mb-6 flex items-center justify-between">
                <span className="text-lg">Dark Mode</span>
                <button
                    onClick={() => dispatch(toggleDarkMode())}
                    className={`px-4 py-2 rounded-full transition duration-300 
                        ${darkMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} 
                        text-white`}
                >
                    {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
            </div>

            {/* Language Section */}
            <div className="mb-6 bg-gray-200 p-4 rounded-lg">
                <div className="flex items-center mb-4">
                    <FaGlobe className="text-2xl text-blue-500 mr-3" />
                    <h2 className="text-xl font-semibold">Language</h2>
                </div>
                <select 
                    value={language} 
                    onChange={handleLanguageChange}
                    className="mt-2 p-3 rounded bg-white text-black w-full focus:outline-none focus:ring focus:ring-blue-500"
                >
                    <option value="en">English</option>
                    <option value="id">Indonesia</option>
                </select>
                <p className="mt-2 text-gray-600">
                    Select your preferred language for browsing and recommendations.
                </p>
            </div>
        </div>
    );
};

export default Setting;
