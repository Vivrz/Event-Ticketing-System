import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Events.module.css";
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
    <div className={styles.eventlist}>
      <h1 className={styles.h1Tag}>Events</h1>

      <button className={styles.backButton} onClick={() => navigate("/HomePage")}>
        Back Home
      </button>

      <button className={styles.addButton} onClick={() => setShowAddEventForm(true)}>
        Add Event
      </button>

      {showAddEventForm && (
        <div className={styles.form}>
          <h2>Add Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={newEvent.price}
            onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <button onClick={handleAddEvent}>Submit</button>
        </div>
      )}

      <div className={styles.body}>
        {events.map((event) => (
          <div key={event._id} className={styles.events_item}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.price}</p>
            <p>{event.description}</p>
            <button className={styles.deleteButton} onClick={() => handleDeleteEvent(event._id)}>
              Delete Event
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;
