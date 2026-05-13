import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      
      {/* Background Map Image */}
      <img
        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1974&auto=format&fit=crop"
        alt="map"
        className="h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-10">
        
        {/* Logo / Title */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-wide">
            Uber Clone
          </h1>

          <p className="text-gray-200 mt-3 text-sm md:text-lg max-w-md">
            Fast, reliable rides across Islamabad and Pakistan.
          </p>
        </div>

        {/* Bottom Card */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Get Started
          </h2>

          <p className="text-gray-200 mt-2 text-sm md:text-base">
            Book rides instantly and travel safely with modern ride-sharing experience.
          </p>

          <Link
            to="/user-signup"
            className="mt-6 inline-flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-4 rounded-2xl transition-all duration-300"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;