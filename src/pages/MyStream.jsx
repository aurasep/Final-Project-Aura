import React from "react";
import { useNavigate } from "react-router-dom";

const MyStream = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: "url(https://i.pinimg.com/564x/f8/79/f4/f879f4538e0a39299bb54adf25f4f2c5.jpg)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-black bg-opacity-50"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-4xl font-bold text-white">Welcome To MyStream</h1>
          <p className="mb-5 text-gray-300">
            The Best Place to Discover Your Favorite Movies! Enjoy a more exciting viewing experience with our collection of the latest films. Let’s start your cinematic adventure with MyStream and find movies that will inspire, entertain, and accompany you through every moment!
          </p>
          <button 
            onClick={handleGetStarted} 
            className="btn bg-blue-500 dark:bg-red-500 hover:bg-blue-700 dark:hover-bg-blue-700 text-white"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyStream;
