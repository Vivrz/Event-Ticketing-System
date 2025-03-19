import React from "react";

const Featured = ({ onNavigate }) => {
  const handleEvent = () => {
    onNavigate && onNavigate("/AnotherPublic_events");
  };

  return (
    <div className="w-full mt-20 bg-gradient-to-b from-purple-900 to-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-pink-400 font-semibold text-lg">
              Experience more
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              The cheapest tickets on the internet, period
            </h1>
            <p className="text-gray-200 text-lg leading-relaxed">
              MVX Events is a comprehensive website designed to simplify event
              discovery, booking, and management. Whether you're a seasoned event
              planner or a casual attendee, our app offers a seamless and
              intuitive experience.
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-2xl">
            <video 
              src="/videoplayback.mp4" 
              autoPlay 
              muted 
              loop 
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;