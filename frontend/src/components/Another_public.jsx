
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";  
import styles from "../styles/Another.module.css";
import { base_url } from '../../Hunter';
const AnotherPublic_events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    userEmail: "",
  });

  // Fetch events
  useEffect(() => {
    axios.get(`${base_url}/events`).then((res) => setEvents(res.data));
  }, []);

  // Handle Booking and Generate PDF
  const handleBookTicket = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Add Title to the PDF
    doc.setFontSize(24);
    doc.text("Concert Ticket", 20, 20);

    // Add Event Information
    doc.setFontSize(18);
    doc.text(`Event: ${selectedEvent.name}`, 20, 40);
    doc.text(`Date: ${new Date(selectedEvent.date).toLocaleDateString()}`, 20, 50);
    doc.text(`Price: ${selectedEvent.price}`, 20, 60);
    doc.text(`Description: ${selectedEvent.description}`, 20, 70);

    // Add Booking Information
    doc.text(`Name: ${bookingDetails.userName}`, 20, 90);
    doc.text(`Email: ${bookingDetails.userEmail}`, 20, 100);

    // Save the PDF file
    doc.save(`${selectedEvent.name}_Ticket.pdf`);

    // After booking, reset the selected event
    alert("Ticket booked successfully!");
    setSelectedEvent(null);
  };

  return (
    <div className={styles.Another}>
      <h1 className="h1Tag">Available Events</h1>

      {/* Events List */}
      <div className={styles.body}>
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className={styles.events_item}
              onClick={() => setSelectedEvent(event)}
            >
              <h3>{event.name}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Price: {event.price}</p>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
      </div>

      {/* Booking Form */}
      {selectedEvent && (
        <div className={styles.form}>
          <h2>Book Ticket for {selectedEvent.name}</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={bookingDetails.userName}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, userName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Your Email"
            value={bookingDetails.userEmail}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, userEmail: e.target.value })
            }
          />
          <button onClick={handleBookTicket}>Book</button>
          <button onClick={() => setSelectedEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default AnotherPublic_events;
