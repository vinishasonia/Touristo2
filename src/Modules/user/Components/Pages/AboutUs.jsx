import React from 'react';
import backgroundImage from '../../Images/bg_1.jpg';
import aboutImage from '../../Images/about-1.jpg'; // Image to be placed on the left
import about from '../../Images/destination-12.jpg';
import '../../Css/AboutPage.css'; // Your CSS file for styling

export default function AboutUs() {
  return (
    <div className="about-container">
      <h1 className="about-heading">About Us</h1>
      <div className="background-image" style={{ backgroundImage: `url(${backgroundImage})` }}></div>
        <div className="about-content">
          <div className="image-content">
            <img src={aboutImage} alt="About Us" />
          </div>
         
          <div className="text-content">
            <h2 >Welcome to Pacific</h2>
            <h1 style={{ fontFamily: 'Georgia, serif' }}>It's time to start your adventure</h1>
            <p>
              Travel is the movement of people between distant geographical locations.
              Travel can be done by foot, bicycle, automobile, train, boat, bus, airplane,
              ship or other means, with or without luggage, and can be one way or round trip.
            </p>
          </div>
          </div>
          <div className="additional-content">
            <h1>"Life is short and the world is Wide......"</h1>
            <p>Travel isn’t always pretty. It isn’t always comfortable. Sometimes it hurts, it even breaks your heart.
               But that’s okay. <br></br>
               The journey changes you; it should change you. It leaves marks on your memory, on your consciousness, 
              on your heart, and on your body.<br></br>
               You take something with you. Hopefully, you leave something good behind.</p>

              <h2>-Anthony Bourdain</h2>
             
          </div>

      
    </div>
  );
}
