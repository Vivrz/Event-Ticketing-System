import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';
import Register from './Register'; // Import the Register component

const Navbar = ({ onNavigate }) => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setLoggedInUser('');

    // Show toast and navigate after 1 second
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false); // Hide toast after a delay
      navigate('/Login');  // Navigate to Login page after 1 second
    }, 2000);  // Show toast for 2 seconds
  };

  const handleOpenRegister = () => {
    setRegister(true); // Set register state to true
  };

  const handleOrganizerLogin = () => {
    navigate('/OrganiserLogin');
  };

  return (
    <div className="relative">
      <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <span className="text-4xl font-bold text-white font-sans tracking-wider hover:text-pink-200 transition-colors duration-300">
                MVX
              </span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="text-white hover:text-pink-200 font-medium transition-all duration-300 hover:scale-105"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="text-white hover:text-pink-200 font-medium transition-all duration-300 hover:scale-105"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={handleOrganizerLogin}
                className="text-white hover:text-pink-200 font-medium transition-all duration-300 hover:scale-105"
              >
                Event Organisers
              </button>
            </div>

            {/* Right Side Buttons */}
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={handleOpenRegister}
                className="bg-pink-400 hover:bg-pink-500 text-purple-900 font-bold py-2 px-4 rounded-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Get Notified
              </button>

              {loggedInUser && (
                <>
                  <div className="bg-pink-400 text-white px-4 py-2 rounded-lg shadow-md transform hover:-translate-y-1 transition-all duration-300">
                    <span className="font-semibold">Welcome, {loggedInUser}!</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Toast Notification */}
      {toastVisible && <Toast message="logged out successfully!" onClose={() => setToastVisible(false)} />}
      
      {register && <Register />} {/* Render Register component when register state is true */}
    </div>
  );
};

export default Navbar;
