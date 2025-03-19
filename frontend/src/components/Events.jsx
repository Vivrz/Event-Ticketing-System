import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../../Hunter";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${base_url}/events`);
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    if (!newEvent.name || !newEvent.date || !newEvent.price || !newEvent.description) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(`${base_url}/add-event`, newEvent);
      setEvents((prevEvents) => [...prevEvents, res.data]);
      setNewEvent({ name: "", date: "", price: "", description: "" });
      setShowAddEventForm(false);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`${base_url}/delete-event/${eventId}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
      alert("Event deleted successfully!");
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Error deleting event");
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-700 via-pink-600 to-rose-600 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold text-center mb-8">Events</h1>

      <div className="flex justify-between mb-6">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          onClick={() => navigate("/HomePage")}
        >
          Back Home
        </button>

        <button
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          onClick={() => setShowAddEventForm(true)}
        >
          Add Event
        </button>
      </div>

      {showAddEventForm && (
        <div className="max-w-xl mx-auto bg-white text-gray-900 p-6 rounded-lg shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center text-purple-600">Add Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Price"
            value={newEvent.price}
            onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleAddEvent}
            className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-all duration-300"
          >
            Submit
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event._id} className="bg-white text-gray-900 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold text-purple-600 mb-2">{event.name}</h3>
            <p className="text-gray-700 mb-2">Date: {event.date}</p>
            <p className="text-gray-700 mb-2">Price: ${event.price}</p>
            <p className="text-gray-600 mb-4">{event.description}</p>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
              onClick={() => handleDeleteEvent(event._id)}
            >
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
