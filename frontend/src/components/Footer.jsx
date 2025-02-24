import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Share2,
} from "lucide-react";

const Footer = () => {
  const sections = ["For designers", "Company", "Directories"];
  const links = [
    "Go Pro!",
    "Explore design work",
    "Design blog",
    "Overtime podcast",
    "Playoffs",
    "Refer a friend",
    "Code of conduct",
  ];

  return (
    <footer className="bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">MVX</h2>
            <p className="text-gray-200">
              Mvx is the world's leading community for creatives to share, and
              get hired.
            </p>
            {/* Social Icons */}
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors duration-300"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://www.instagram.com/numen_vivek/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors duration-300"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors duration-300"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-pink-400 transition-colors duration-300"
              >
                <Share2 size={24} />
              </a>
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section) => (
            <div key={section} className="space-y-4">
              <h3 className="text-xl font-semibold text-white">{section}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-gray-200 hover:text-pink-400 transition-colors duration-300">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Divider */}
        <div className="h-px bg-gray-200 bg-opacity-20 my-8" />

        {/* Copyright */}
        <div className="text-center text-gray-200">&copy; MVX All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;
