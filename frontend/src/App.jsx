import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/Home";
import OrganiserSignup from "./components/OrganiserSignup";
import OrganiserLogin from "./components/OrganiserLogin";
import Events from "./components/Events";
import PublicEvents from "./components/PublicEvents";
import AnotherPublicEvents from "./components/AnotherPublicEvents";
import { auth, provider, signInWithPopup } from "./components/firebase"; 

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
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/HomePage" /> : <Navigate to="/Login" />} />
        <Route path="/Login" element={<Login onGoogleLogin={handleGoogleLogin} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/OrganiserSignup" element={<OrganiserSignup />} />
        <Route path="/OrganiserLogin" element={<OrganiserLogin />} />
        <Route path="/Events" element={<Events />} />
        <Route path="/PublicEvents" element={<PublicEvents />} />
        <Route path="/AnotherPublicEvents" element={<AnotherPublicEvents />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
