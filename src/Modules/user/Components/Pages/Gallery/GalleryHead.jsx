import React, { useContext } from 'react';
import { Grid, Typography, Button, Card, CardMedia, CardContent, Box } from '@mui/material';
import banner from '../../../../../Images/tour-img02.jpg';
import { AuthContext } from '../../../../GlobalContext';
import { useNavigate } from 'react-router-dom';

const GalleryHead = () => {
  const { galleryList, imagePath } = useContext(AuthContext);
  let navigate=useNavigate()

  return (
    <Grid container spacing={3} sx={{ px: 10 }}>
      {/* Header Section */}
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {/* Left side with image */}
            <img src={banner} alt="Traveler" style={{ maxWidth: '100%', height: 'auto' }} />
          </Grid>
          <Grid item xs={12} md={6}>
            {/* Right side with text and buttons */}
            <Typography variant="h2">Life is short and the world is wide!</Typography>
            <Typography variant="body1">
              To get the best of your adventure you just need to leave and go where you like. We are waiting for you.
            </Typography>
            <Button onClick={()=>navigate('/packages')} sx={{ my: 1 }} variant="contained" color="primary">View Package</Button>
          </Grid>
        </Grid>
      </Grid>

      {/* Discover Nature Section */}
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Explore Our Stunning Gallery
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          Dive into a curated collection of breathtaking images and captivating videos. Discover the beauty of nature from around the world and get inspired for your next adventure. Click on each item to explore more and experience the wonders of our gallery.
        </Typography>
        {galleryList && galleryList.length > 0 ? (
          <Grid container spacing={2} sx={{ my: 2 }}>
            {galleryList.map((gallery, index) => (
              <Grid item xs={12} key={gallery?._id}>
                <Card
                  elevation={0}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    borderRadius: '15px',
                    backgroundColor: "#f1e7e4"
                  }}
                >
                  <Grid container spacing={2}>
                    {/* Image and Video Section */}
                    <Grid item xs={12} md={6}>
                      <CardMedia
                        component="img"
                        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        image={`${imagePath}/${gallery?.thumbnail}`} // Display the thumbnail image
                        alt={gallery?.title}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <video
                          controls
                          src={`${imagePath}/${gallery?.video}`} // Display the video
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                  <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography variant="h4">{gallery?.title}</Typography>
                    <Typography variant="body1">{gallery?.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
        <Grid sx={{mb:25}}>
            <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            No gallery items available at the moment. Please check back later.
          </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default GalleryHead;
