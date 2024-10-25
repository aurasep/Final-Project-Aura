import React, { useState } from 'react';
import { FaGlobe, FaVideo, FaDesktop } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';


const Settings = () => {
  const [language, setLanguage] = useState('en');
  const [streamQuality, setStreamQuality] = useState('1080p');
  const [manageDevices] = useState([
    { device: 'iPhone 12', location: 'New York, USA' },
    { device: 'Samsung Galaxy S21', location: 'Los Angeles, USA' },
    { device: 'Windows PC', location: 'San Francisco, USA' },
  ]);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleStreamQualityChange = (e) => {
    setStreamQuality(e.target.value);
  };

  const handleSignOutAll = () => {
    alert('Signed out of all devices!');
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg max-w-xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

      {/* Language Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaGlobe className="text-2xl text-blue-500 mr-3" />
          <h2 className="text-2xl font-semibold">Language</h2>
        </div>
        <select 
          value={language} 
          onChange={handleLanguageChange}
          className="mt-2 p-3 rounded bg-gray-700 text-white w-full focus:outline-none"
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
        </select>
        <p className="mt-2 text-gray-400">
          Select your preferred language for browsing and recommendations.
        </p>
      </div>

      {/* Streaming Quality Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaVideo className="text-2xl text-green-500 mr-3" />
          <h2 className="text-2xl font-semibold">Streaming Quality</h2>
        </div>
        <select 
          value={streamQuality} 
          onChange={handleStreamQualityChange}
          className="mt-2 p-3 rounded bg-gray-700 text-white w-full focus:outline-none"
        >
          <option value="auto">Auto</option>
          <option value="720p">720p (HD)</option>
          <option value="1080p">1080p (Full HD)</option>
          <option value="4k">4K (Ultra HD)</option>
        </select>
        <p className="mt-2 text-gray-400">
          Adjust the quality to match your internet speed for the best viewing experience.
        </p>
      </div>

      {/* Manage Devices Section */}
      <div className="mb-6 bg-gray-800 p-4 rounded-lg">
        <div className="flex items-center mb-4">
          <FaDesktop className="text-2xl text-yellow-500 mr-3" />
          <h2 className="text-2xl font-semibold">Manage Devices</h2>
        </div>
        <div className="bg-gray-700 rounded p-4">
          {manageDevices.map((device, index) => (
            <div key={index} className="flex justify-between items-center mb-2">
              <span className="text-white">{device.device}</span>
              <span className="text-gray-400">{device.location}</span>
            </div>
          ))}
        </div>
        <p className="mt-2 text-gray-400">
          Review the devices that have access to your account.
        </p>
      </div>

      <div className="mt-6 flex justify-end">
        <button 
          onClick={handleSignOutAll}
          className="flex items-center px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition duration-300"
        >
          <RiLogoutBoxRLine className="mr-2" /> Sign Out of All Devices
        </button>
      </div>
    </div>
  );
};

export default Settings;
