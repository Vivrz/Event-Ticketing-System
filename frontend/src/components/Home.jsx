import React from 'react'
import Navbar from './Navbar'
import Featured from './Featured'
import Footer from './Footer'
import Public_events from './public_events'

const HomePage = () => {
  return (
    <div>
        <Navbar />
        <Featured />
        <br />
        <Public_events/>
        <Footer />
    </div>
  )
}

export default HomePage;