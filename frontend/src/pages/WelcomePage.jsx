import React from 'react';
import img from '../assets/land.webp';

const WelcomePage = () => {
  return (
    <div className="min-h-screen bg-white w-[90%]">

      {/* Main Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-2">
        {/* Text */}
        <div className="md:w-1/2 mb-6 md:mb-0">
        <h1 className="text-5xl text-center font-bold font-serif text-gray-900 mb-10 pt-6">
          Welcome to <br />
          <span className="text-pink-600">Serenity Circle</span>
        </h1>
          <h5 className="text-2xl font-bold text-gray-900 leading-tight mb-3">
            Your Daily Companion for <br /> 
            <span className="text-pink-700">Mental Wellness and Growth</span>
          </h5>
          <p className="text-gray-600 mb-4">
            <span className="font-medium text-gray-800">Stay Productive & Work Remotely</span><br />
            The key to work-from-home success is to create an environment that allows you to focus on the tasks at hand. Whether you are working from home for the first time.
          </p>
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow">
            Get Started
          </button>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={img}
            alt="Meditation Illustration"
            className="max-w-xs md:max-w-sm lg:max-w-md"
          />
        </div>
      </main>
    </div>
  );
};

export default WelcomePage;