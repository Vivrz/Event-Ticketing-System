import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div
      className="fixed top-4 right-4 bg-green-500 text-white p-3 rounded-lg shadow-lg z-50 flex items-center space-x-4 transition-opacity duration-300"
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 p-1 text-white hover:bg-white hover:text-gray-700 rounded-full transition-colors duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Toast;
