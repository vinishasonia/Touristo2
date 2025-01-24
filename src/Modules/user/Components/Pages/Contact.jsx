import { useState, useEffect } from 'react';
import { Button, Container, Typography, Avatar, Card, CardContent, Grid, Box } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import '../../Css/Contact.css';

const backgroundImages = [
  require('../../../../../src/Images/1714740906069g6.jpg'),
  require('../../../../../src/Images/hero-banner.jpg'),
  require('../../../../../src/Images/tour.jpg')
];

export default function Contact() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + backgroundImages.length) % backgroundImages.length);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  return (
    <>
      <section
        className="contact-section"
        style={{ backgroundImage: `url(${backgroundImages[currentImageIndex]})` }}
      >
        <Container className="contact-container" >
          <Box sx={{bottom:100,position:'relative',textAlign:'center'}}>

          <Typography variant="h3" component="h1" className="contact-title" sx={{textAlign:"center"}}>
            We are here to make your travel comfort
          </Typography>
          <Typography variant="h6" className="contact-description" sx={{textAlign:"center"}}>
            Make your Travel Amazing with Us
          </Typography>
          </Box>

          {/* Previous Button */}
          <Button
            className="nav-button left-button"
            onClick={handlePrevImage}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              backgroundColor:'rgba(256, 256, 200, 0.1)',
              color: 'white',
              borderRadius: '50%',
              fontSize: '3rem', // Increase font size
              minWidth: '48px',
              height: '55px',
              width: '55px',
              zIndex: 2
            }}
          >
            <ChevronLeft className="nav-icon" sx={{ fontSize: 'inherit' ,color:'white'}} />
          </Button>

          {/* Next Button */}
          <Button
            className="nav-button right-button"
            onClick={handleNextImage}
            sx={{
              position: 'absolute',
              top: '50%',
              right: '10px',
              transform: 'translateY(-50%)',
              backgroundColor:'rgba(256, 256, 200, 0.1)',
              color: 'white',
              borderRadius: '50%',
              fontSize: '3rem', // Increase font size
              minWidth: '48px',
              height: '55px',
              width: '55px',
              zIndex: 2
            }}
          >
            <ChevronRight className="nav-icon" sx={{ fontSize: 'inherit',color:'white' }} />
          </Button>
        </Container>
      </section>

      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ padding: '20px' }}>
        {/* Address Card */}
        <Grid item>
          <Card sx={{ minWidth: 275, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
              <Avatar sx={{ backgroundColor: '#3f51b5', width: 56, height: 56, mb: 1 }}>
                <LocationOnIcon sx={{ fontSize: '32px', color: '#ffffff' }} />
              </Avatar>
              <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>
                198 West 21th Street, New York
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Contact Number Card */}
        <Grid item>
          <Card sx={{ minWidth: 275, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
              <Avatar sx={{ backgroundColor: '#3f51b5', width: 56, height: 56, mb: 1 }}>
                <PhoneIcon sx={{ fontSize: '32px', color: '#ffffff' }} />
              </Avatar>
              <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>
                +1235 2355 98
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Email Card */}
        <Grid item>
          <Card sx={{ minWidth: 275, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
              <Avatar sx={{ backgroundColor: '#3f51b5', width: 56, height: 56, mb: 1 }}>
                <EmailIcon sx={{ fontSize: '32px', color: '#ffffff' }} />
              </Avatar>
              <Typography
                variant="body1"
                align="center"
                component="a"
                href="mailto:info@yoursite.com"
                sx={{ color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}
              >
                info@yoursite.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Website Card */}
        <Grid item>
          <Card sx={{ minWidth: 275, backgroundColor: '#ffffff', boxShadow: '0 4px 8px rgba(0,0,0,0.2)', borderRadius: '12px' }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px' }}>
              <Avatar sx={{ backgroundColor: '#3f51b5', width: 56, height: 56, mb: 1 }}>
                <LanguageIcon sx={{ fontSize: '32px', color: '#ffffff' }} />
              </Avatar>
              <Typography
                variant="body1"
                align="center"
                component="a"
                href="http://yoursite.com"
                target="_blank"
                sx={{ color: '#3f51b5', textDecoration: 'none', fontWeight: 'bold' }}
              >
                yoursite.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
