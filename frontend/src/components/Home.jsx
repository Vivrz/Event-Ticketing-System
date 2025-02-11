// import React from 'react'
// import Navbar from './Navbar'
// import Featured from './Featured'
// import Footer from './Footer'
// import Public_events from './public_events'

// const HomePage = () => {
//   return (
//     <div>
//         <Navbar />
//         <Featured />
//         <br />
//         <Public_events/>
//         <Footer />
//     </div>
//   )
// }

// export default HomePage;
import React from "react";
import Navbar from "./Navbar";
import Featured from "./Featured";
import Footer from "./Footer";
import PublicEvents from "./Public_events"; // Ensure case matches file name

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Featured />
      <br />
      <PublicEvents />
      <Footer />
    </>
  );
};

export default HomePage;