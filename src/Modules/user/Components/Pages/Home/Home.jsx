import React, { useState, useRef, useEffect } from 'react';
import '../../../Css/Home.css';
import bg_2 from '../../../Images/bg_1.jpg'; // Background image
import videoBg from '../../../Images/hero-video.mp4'; // Video file
import activitiesImage from '../../../../../Images/Featured-image.jpg';
import travelArrangementsImage from '../../../../../Images/family.jpg';

// import SectionCard from '../Pages/SectionCard';

import { Container, Typography, Dialog, DialogContent, IconButton, Box, Grid, Button, TextField, Divider } from '@mui/material';
import { PlayCircleOutline } from '@mui/icons-material';
import DreamVacationUI from './HomeContent';
import Feedback from './Feedback';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const videoRef = useRef(null);

  const handleVideoOpen = () => {
    setIsVideoOpen(true);
  };

  const handleVideoClose = () => {
    setIsVideoOpen(false);

  };

  useEffect(() => {
    if (isVideoOpen && videoRef.current) {
      videoRef.current.play();
      videoRef.current.muted = false;
    }
  }, [isVideoOpen]);

  let navigate=useNavigate()


  return (
    <>
      <section className="section" style={{ backgroundImage: `url(${bg_2})` }}>
        <Dialog open={isVideoOpen} onClose={handleVideoClose} maxWidth="md" fullWidth>
          <DialogContent>
            <video ref={videoRef} controls className="videoPlayer" autoPlay>
              <source src={videoBg} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </DialogContent>
        </Dialog>
        <Container className="container">
          <div className="iconWrapper" >
            <IconButton className="playButton" onClick={handleVideoOpen}>
              <PlayCircleOutline className="icon" />
            </IconButton>
          </div>
          <Typography variant="h3" component="h1" fontWeight="bold" className="headline">
            Make Your Tour Amazing With Us

          </Typography>
          <Typography variant="h6" maxWidth="700px" marginLeft="20%" marginTop='10px' className="subheading">

            Travel to any corner of the world, without going around in circles
          </Typography>
        </Container>
        {/* filter search */}

      </section>

      <DreamVacationUI />

      <div className="about-content">
        <div className="image-content">
          <img src={activitiesImage} alt="About Us" />
          <img src={travelArrangementsImage} alt="About Us" />
        </div>

        <div className="text-content">
          <h1 >It's time to start your adventure
          </h1>

          <p>
            Travel is the movement of people between distant geographical locations.
            Travel can be done by foot, bicycle, automobile, train, boat, bus, airplane,
            ship or other means, with or without luggage, and can be one way or round trip.
          </p>
          <button onClick={()=>navigate('/packages')} className="search-destination-button">View packages</button>
        </div>

      </div>

      <Box sx={{ width: '100%', my: 8, px: 2 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h2" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
            Share Your Travel Experience
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Your feedback helps us to improve our travel services. Tell us about your recent adventure,
            share your memorable moments, and let us know how we can make your next trip even better.
          </Typography>
        </Box>

        <Feedback />

      </Box>
    </>

  );
}
