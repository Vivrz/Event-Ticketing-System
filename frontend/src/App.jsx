
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/Home";
import OrganiserSignup from "./components/Organiser-signup";
import OrganiserLogin from "./components/Organiser-Login";
import Events from "./components/Events";
import Public_events from "./components/public_events";
import AnotherPublic_events from "./components/Another_public";
import { auth, provider, signInWithPopup } from "./components/firsbase";

const App = () => {
  const [user, setUser] = useState(null);

  // Check user authentication state
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  // Handle Google Sign-In
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user); // Set the authenticated user
    } catch (error) {
      console.error("Error during Google Sign-In", error);
    }
  };

  return (
    <Router>
      <div>
        <Routes>
          {/* Redirect to login if not authenticated */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <Navigate to="/login" />} />

          <Route
            path="/login"
            element={
              <Login
                onGoogleLogin={handleGoogleLogin} // Pass Google login handler
              />
            }
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/organiser-signup" element={<OrganiserSignup />} />
          <Route path="/organiser-login" element={<OrganiserLogin />} />
          <Route path="/Events" element={user ? <Events /> : <Navigate to="/login" />} />
          <Route path="/Public_events" element={<Public_events />} />
          <Route path="/AnotherPublic_events" element={<AnotherPublic_events />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
