
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Error during Google Sign-In", error);
    }
  };

  return (
    <Routes>
      <Route path="/" element={user ? <Navigate to="/HomePage" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login onGoogleLogin={handleGoogleLogin} />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/OrganiserSignup" element={<OrganiserSignup />} />
      <Route path="/OrganiserLogin" element={<OrganiserLogin />} />
      <Route path="/Events" element={user ? <Events /> : <Navigate to="/OrganiserLogin" />} />
      <Route path="/Public_events" element={<Public_events />} />
      <Route path="/AnotherPublic_events" element={<AnotherPublic_events />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;