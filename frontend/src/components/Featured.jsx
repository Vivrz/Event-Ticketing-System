import React from "react";
import styles from "../styles/Featured.module.css";
import { useNavigate } from "react-router-dom";

const Featured = () => {
  const navigate = useNavigate();
  const handleEvent = () => {
    navigate("/AnotherPublic_events");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.feature_container}>
        <div className={styles.feature_text}>
          <span>Experience more</span>
          <h1>The cheapest tickets on the internet, period</h1>
          <span>
            MNX Events is a comprehensive website designed to simplify event
            discovery, booking, and management. Whether you're a seasoned event
            planner or a casual attendee, our app offers a seamless and
            intuitive experience.
          </span>
        </div>

        <div className={styles.feature_image}>
          <video src="/Rockband.mp4" autoPlay muted loop></video>
        </div>
      </div>
      {/* Search box */}
      <div className={styles.search_container}>
        <div className={styles.search_item}>
          <h3>Location</h3>
          <input type="text" placeholder="Search location" />
        </div>

        <div className={styles.search_item}>
          <h3>Date</h3>
          <input type="date" />
        </div>

        <div className={styles.search_item}>
          <h3>Price</h3>
          <select>
            <option value="" disabled>
              All prices
            </option>
            <option value="0-500">$0-$500</option>
            <option value="500-1000">$500-$1000</option>
            <option value="1000+">$1000+</option>
          </select>
        </div>
        <div className={styles.search_item}>
          <h3>Event Type</h3>
          <select>
            <option value="online">Online</option>
            <option value="physical">Physical</option>
            <option value="blended">Blended</option>
          </select>
          <button className={styles.search_button} onClick={handleEvent}>
            Find Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
