
import React from "react";
import Navbar from "./Navbar";
import Featured from "./Featured";
import Footer from "./Footer";
import PublicEvents from "./PublicEvents";

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