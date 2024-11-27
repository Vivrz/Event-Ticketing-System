import  { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "../styles/Events.module.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    price: "",
    description: "",
  });

  const navigate = useNavigate(); // Initialize navigate

  // Fetch events
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => setEvents(res.data));
  }, []);

  // Handle Add Event
  const handleAddEvent = () => {
    axios.post("http://localhost:5000/add-event", newEvent).then((res) => {
      setEvents([...events, res.data]);
      setShowAddEventForm(false);
    });
  };

  // Handle Delete Event
  const handleDeleteEvent = (eventId) => {
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    axios
      .delete(`http://localhost:5000/delete-event/${eventId}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== eventId));
        alert("Event deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error deleting event");
      });
  };

  // Handle Event Click (Navigate to Booking Page)
  const handleEventClick = (event) => {
    navigate(`/book-ticket/${event._id}, { state: { event } }`);
  };

  return (
    <div className={styles.container}>
      <h1 className="h1Tag">Events</h1>

      {/* Back Home Button */}
      <button className={styles.backButton} onClick={() => navigate("/home")}>
        Back Home
      </button>

      <button
        className={styles.addButton}
        onClick={() => setShowAddEventForm(true)}
      >
        Add Event
      </button>

      {/* Add Event Form */}
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
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          ></textarea>
          <button onClick={handleAddEvent}>Submit</button>
        </div>
      )}

      {/* Events List */}
      <div className={styles.body}>
        {events.map((event) => (
          <div key={event._id} className={styles.events_item}>
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.price}</p>
            <p>{event.description}</p>
            <button
              className={styles.deleteButton}
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