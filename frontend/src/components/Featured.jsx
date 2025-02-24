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
              src="https://rr9---sn-ci5gup-qxar.googlevideo.com/videoplayback?expire=1740408029&ei=fTC8Z5qhBYCw6dsPvoSz2AQ&ip=172.71.99.109&id=o-ACHeR-L5mi2HK9oNz0z8bmidKDzq4B2HiIs2dzIQTfUA&itag=137&aitags=134%2C136%2C137%2C160%2C243&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AUWDL3zFmLGkDok1oxGICUHe5dCNrBBDsewbnmxVXBXqwV-gqKDYMeIS9JJ7pQdfGIT1oW6Zs9I5yXcz&spc=RjZbSSGvWMSc5TFxlEITVKlPO3WaKz1qUVSsYM-Y-q-9rySVSfJuEMBh3FLrGbMF36A&vprv=1&svpuc=1&mime=video%2Fmp4&ns=0B3adWyYD2DJiMjZBhxpR1kQ&rqh=1&gir=yes&clen=33510810&dur=75.000&lmt=1649658392200780&keepalive=yes&lmw=1&fexp=24350590,24350737,24350827,24350961,24351130,24351173,51326932&c=TVHTML5&sefc=1&txp=5432434&n=IRHcxaXCmypZPA&sparams=expire%2Cei%2Cip%2Cid%2Caitags%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cns%2Crqh%2Cgir%2Cclen%2Cdur%2Clmt&sig=AJfQdSswRgIhALOu3Il2240Fhj3lIUzLf45QBKHD3FWk4wX06mIFqKmfAiEA0D9BNRsQenHKTM4StbpU6ioBZ1fO93CKCv9GwluOpeI%3D&title=Diljit+Dosanjh%3A+Born+To+Shine+-+World+Tour+2022+%7C+A+Glimpse&redirect_counter=1&rm=sn-5hnesz7z&rrc=104&req_id=97a10f551058a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1740386439,&mh=yh&mip=2401:4900:883f:79fd:94db:9934:f8c1:ade1&mm=31&mn=sn-ci5gup-qxar&ms=au&mt=1740386224&mv=m&mvi=9&pl=50&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=AGluJ3MwRAIfKxOMLbYd1OUD7XP6dX_k7vYbhUjqY2WP10IhQFV4SAIhAIi_VQaW8msTfPD2b-zwdBXVqMJSVGoKg3MAjPw_upUL" 
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