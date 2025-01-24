import React from 'react';
import { Box, Grid } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import '../../Css/Footer.css';

export default function Footer() {
  return (
    <Box
      component="footer" // Use footer as semantic HTML element
      className="footer-container"
      sx={{
        backgroundColor: '#ffc0cb', // Pink background color
        color: 'white',
        marginTop: 'auto', // Pushes footer to the bottom of its container
        width: '100%',
      }}
    >
      <Grid container spacing={2} className="header-background">
        <Grid item xs={12} sm={3}>
          <div className="header-column">
            <h2>Vacation</h2>
            <p className='p'>Far far away, behind the word mountains, far from the countries <br />
              Vokalia and Consonantia, 
              there live the blind texts.</p>
            <div className="social-icons">
              <a href="#" target="_blank"><Twitter /></a>
              <a href="#" target="_blank"><Facebook /></a>
              <a href="#" target="_blank"><Instagram /></a>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="header-column">
            <h2>Information</h2>
            <ul className="info-list">
              <li>Online Enquiry</li>
              <li>General Enquiries</li>
              <li>Booking Conditions</li>
              <li>Privacy and Policy</li>
              <li>Refund Policy</li>
              <li>Call Us</li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="header-column">
            <h2>Experience</h2>
            <ul className="experience-list">
              <li>Adventure</li>
              <li>Hotel and Restaurant</li>
              <li>Beach</li>
              <li>Nature</li>
              <li>Camping</li>
              <li>Party</li>
            </ul>
          </div>
        </Grid>
        <Grid item xs={12} sm={3}>
          <div className="header-column">
            <h2>Have a Questions?</h2>
            <ul className="address-list">
              <li>203 Fake St. Mountain View, San Francisco, California, USA</li>
              <li>+2 392 3929 210</li>
              <li>info@yourdomain.com</li>
            </ul>
          </div>
        </Grid>
      </Grid>
      <div className="copyright">
        <p>Copyright ©2024 All rights reserved | This template is made with by Colorlib</p>
      </div>
    </Box>
  );
}
