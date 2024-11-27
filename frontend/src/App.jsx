// import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
// import Signup from "./components/Signup";
// import Login from "./components/Login";
// import HomePage from "./components/Home";


// const App = () => {
//   return (
//     <Router>
//       <div>
//         <Routes>
//           <Route path='/' element={<Navigate to="/login" />} />

//           <Route path="/signup" element={<Signup />} />

//           <Route path="/login" element={<Login />} />

//           <Route path="/home" element={<HomePage />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup"; // Simple Signup
import Login from "./components/Login"; // Simple Login
import HomePage from "./components/Home"; // Home Page
import OrganiserSignup from "./components/Organiser-signup"; // Organiser Signup
import OrganiserLogin from "./components/Organiser-Login"; // Organiser Login
import Events from "./components/Events"
import Public_events from "./components/public_events";
import AnotherPublic_events from "./components/Another_public";
const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Default Route redirects to Login */}
          <Route path='/' element={<Navigate to="/login" />} />

          {/* Simple User Routes */}
          <Route path="/signup" element={<Signup />} />  {/* Simple Signup */}
          <Route path="/login" element={<Login />} />  {/* Simple Login */}

          {/* Home Page */}
          <Route path="/home" element={<HomePage />} />

          {/* Organiser Routes */}
          <Route path="/organiser-signup" element={<OrganiserSignup />} />  {/* Organiser Signup */}
          <Route path="/organiser-login" element={<OrganiserLogin />} />  {/* Organiser Login */}
          <Route path="/Events" element={<Events />} /> {/* Events Page */}
          <Route path="/Public_events" element={<Public_events />} />
          <Route path="/AnotherPublic_events" element={<AnotherPublic_events />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// export default App;