import React, { useState, useEffect } from "react";

const AnotherPublicEvents = ({ base_url }) => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    userEmail: "",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, [base_url]);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${base_url}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      const data = await response.json();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookTicket = () => {

    setShowConfirmation(true);
  };

  const handleCloseBooking = () => {
    setSelectedEvent(null);
    setShowConfirmation(false);
    setBookingDetails({ userName: "", userEmail: "" });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-xl">Error loading events: {error}</p>
          <button 
            onClick={fetchEvents}
            className="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-800 to-purple-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <h1 className="text-4xl font-bold text-white text-center mb-12">
          Available Events
        </h1>

       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full text-center text-white text-xl">
              Loading events...
            </div>
          ) : events.length > 0 ? (
            events.map((event) => (
              <div
                key={event._id}
                onClick={() => setSelectedEvent(event)}
                className="bg-white rounded-xl shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-2xl font-bold text-purple-900 mb-4">
                  {event.name}
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold mr-2">Date:</span>
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <span className="font-semibold mr-2">Price:</span>
                    {event.price}
                  </p>
                  <p className="text-gray-600 mt-4">{event.description}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-white text-xl">
              No events available at the moment.
            </div>
          )}
        </div>

       
        {selectedEvent && !showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold text-purple-900 mb-6">
                Book Ticket for {selectedEvent.name}
              </h2>
              
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={bookingDetails.userName}
                  onChange={(e) =>
                    setBookingDetails({ ...bookingDetails, userName: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300"
                />
                
                <input
                  type="email"
                  placeholder="Your Email"
                  value={bookingDetails.userEmail}
                  onChange={(e) =>
                    setBookingDetails({ ...bookingDetails, userEmail: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all duration-300"
                />

                <div className="flex space-x-4 mt-6">
                  <button
                    onClick={handleBookTicket}
                    className="flex-1 bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 text-white font-bold py-2 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Book
                  </button>
                  
                  <button
                    onClick={handleCloseBooking}
                    className="flex-1 bg-gray-200 text-gray-800 font-bold py-2 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

       
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                Booking Confirmed!
              </h2>
              <div className="space-y-2 mb-6">
                <p className="text-gray-600">Event: {selectedEvent.name}</p>
                <p className="text-gray-600">Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>
                <p className="text-gray-600">Name: {bookingDetails.userName}</p>
                <p className="text-gray-600">Email: {bookingDetails.userEmail}</p>
              </div>
              <button
                onClick={handleCloseBooking}
                className="bg-gradient-to-r from-purple-900 via-pink-800 to-rose-800 text-white font-bold py-2 px-6 rounded-lg transform hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-xl"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnotherPublicEvents;
