
import React from "react";
import Navbar from "./Navbar";
import Featured from "./Featured";
import Footer from "./Footer";
import Public_events from "./public_events";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <Featured />
      <br />
      <Public_events />
      <Footer />
    </>
  );
};

export default HomePage;