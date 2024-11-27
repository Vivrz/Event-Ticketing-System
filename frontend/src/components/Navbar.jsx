
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import styles from '../styles/Navbar.module.css';
import Register from './Register';

const Navbar = () => {
  const [register, setRegister] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {

    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    alert('User logged out successfully!');
    setTimeout(() => {
      navigate('/Login');
    }, 500);
  };

  const handleOpenRegister = () => {
    setRegister(true);
  };

  const handleOrganizerLogin = () => {
    navigate('/organiser-signup');
  };

  const handleClick = () => {
    window.location.reload();
  };

  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={styles.logo}>
            <span className={styles.logo_text}>MVX</span>
          </div>
          <div className={styles.menulink}>
            <span onClick={handleClick}>Home</span>
            <span>About Us</span>
            <span onClick={handleOrganizerLogin} className={styles.clickable}>
              Event Organisers
            </span>
          </div>
          <div className={styles.notified}>
            <button onClick={handleOpenRegister}>
              Get Notified with the events
            </button>
            {loggedInUser && (
              <>
                <div className={styles.userBox}>
                  <span>Welcome, {loggedInUser}!</span>
                </div>
                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {register && <Register />}
    </>
  );
};

export default Navbar;
