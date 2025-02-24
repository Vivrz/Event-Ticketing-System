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
              MNX Events is a comprehensive website designed to simplify event
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-xl shadow-2xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="space-y-2">
            <h3 className="text-gray-700 font-semibold">Location</h3>
            <input
              type="text"
              placeholder="Search location"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-700 font-semibold">Date</h3>
            <input
              type="date"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-700 font-semibold">Price</h3>
            <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300">
              <option value="" disabled>All prices</option>
              <option value="0-500">$0-$500</option>
              <option value="500-1000">$500-$1000</option>
              <option value="1000+">$1000+</option>
            </select>
          </div>
          <div className="space-y-2">
            <h3 className="text-gray-700 font-semibold">Event Type</h3>
            <div className="space-y-4">
              <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300">
                <option value="online">Online</option>
                <option value="physical">Physical</option>
                <option value="blended">Blended</option>
              </select>
              <button
                onClick={handleEvent}
                className="w-full bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 text-white font-bold py-2 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Find Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;