import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import { base_url } from "../../Hunter";

const PublicEvents = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    userEmail: "",
  });

 
  useEffect(() => {
    axios.get(`${base_url}/events`).then((res) => setEvents(res.data));
  }, []);


  const handleBookTicket = () => {
    if (!bookingDetails.userName || !bookingDetails.userEmail) {
      alert("Please fill in all fields!");
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("🎫 Event Ticket", 20, 20);
    doc.setFontSize(16);
    doc.text(`Event: ${selectedEvent.name}`, 20, 40);
    doc.text(`Date: ${new Date(selectedEvent.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Price: ${selectedEvent.price}`, 20, 60);
    doc.text(`Description: ${selectedEvent.description}`, 20, 70);
    doc.text(`Name: ${bookingDetails.userName}`, 20, 90);
    doc.text(`Email: ${bookingDetails.userEmail}`, 20, 100);
    doc.save(`${selectedEvent.name}_Ticket.pdf`);

    alert("Ticket booked successfully!");
    setSelectedEvent(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-white text-center mb-6">🎭 Available Events</h1>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-xl shadow-lg cursor-pointer hover:scale-105 transition duration-300"
              onClick={() => setSelectedEvent(event)}
            >
              <h3 className="text-xl font-bold text-white mb-2">{event.name}</h3>
              <p className="text-gray-300">📅 Date: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-gray-300">💰 Price: {event.price}</p>
              <p className="text-gray-300 truncate">{event.description}</p>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No events available at the moment.</p>
        )}
      </div>

   
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Book Ticket for {selectedEvent.name}
            </h2>

            <input
              type="text"
              placeholder="Your Name"
              value={bookingDetails.userName}
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, userName: e.target.value })
              }
              className="w-full p-3 mb-3 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <input
              type="email"
              placeholder="Your Email"
              value={bookingDetails.userEmail}
              onChange={(e) =>
                setBookingDetails({ ...bookingDetails, userEmail: e.target.value })
              }
              className="w-full p-3 mb-4 border rounded-lg focus:ring-2 focus:ring-pink-400 outline-none"
            />

            <div className="flex justify-between">
              <button
                onClick={handleBookTicket}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                ✅ Book
              </button>
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicEvents;
