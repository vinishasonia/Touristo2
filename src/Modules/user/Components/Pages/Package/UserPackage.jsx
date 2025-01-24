import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Grid, Card, CardMedia, CardContent, MenuItem, Select, FormControl, InputLabel, Container } from '@mui/material';
import { AuthContext } from '../../../../GlobalContext';

const DestinationCard = ({ packageData, imagePath }) => {
  const navigate = useNavigate();
  
  const handleCardClick = () => {
    navigate(`/package-detail/${packageData?._id}`, { state: { fromPackage: true } });
  };

  return (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer', borderRadius: 3 }} onClick={handleCardClick}>
      <CardMedia
        component="img"
        height="200"
        image={`${imagePath}/${packageData?.thumbnail}`} // Assuming `thumbnail` contains the image URL
        alt={packageData?.name}
      />
        <Box sx={{ position: 'absolute', backgroundColor: packageData?.status == "expired" ? 'red' : 'green' ,borderTopLeftRadius:5,borderBottomRightRadius:15,border:'1px solid white'}}>
                <Typography sx={{ padding: 1, color: 'white' }}>
                  {packageData?.status == "expired" ? 'Expired' : 'Active' }
                </Typography>
              </Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 900 }}>{packageData?.name}</Typography>
        <Typography variant="body1" color="textSecondary">{`Price: ₹${packageData?.price}`}</Typography>
        <Typography variant="body1" color="textSecondary">{`Location: ${packageData?.destination}`}</Typography>
      </CardContent>
    </Card>
  );
};

const TravelDestinations = () => {
  const { packageList, imagePath } = useContext(AuthContext);

  const [sortOption, setSortOption] = useState('Most Popular');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('All');
  
  useEffect(() => {
    const uniqueLocations = Array.from(new Set(packageList.map(packageData => packageData.destination)));
    setLocations(uniqueLocations);
  }, [packageList]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (location) => {
    setSelectedLocation(location);
  };

  const sortedPackageList = [...packageList].sort((a, b) => {
    switch (sortOption) {
      case 'Price: Low to High':
        return a.price - b.price;
      case 'Price: High to Low':
        return b.price - a.price;
      case 'Most Popular':
      default:
        // Assuming `mostPopular` field determines popularity
        return b.mostPopular - a.mostPopular; // Adjust this according to your logic
    }
  });

  const filteredPackageList = selectedLocation === 'All'
    ? sortedPackageList
    : sortedPackageList.filter(packageData => packageData.destination === selectedLocation);

  return (
    <>
      <Container sx={{ mt: 5, mb: 15 }}>
        <Box textAlign="center" my={5}>
          <Typography variant="h4">Popular Destinations You Can Travel</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            There are many packages more than you needed just to make sure that you get enough options to avail the best one
          </Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Box
            display="flex"
            overflow="auto"
            sx={{ whiteSpace: 'nowrap', mb: 2 }}
          >
            {['All', ...locations].map((filter) => (
              <Button
                key={filter}
                variant={selectedLocation === filter ? 'contained' : 'outlined'}
                onClick={() => handleFilterChange(filter)}
                sx={{ mr: 2, whiteSpace: 'nowrap' }}
              >
                {filter}
              </Button>
            ))}
          </Box>
          <FormControl variant="outlined" size="small">
            <InputLabel>Sort by</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort by">
              <MenuItem value="Most Popular">Most Popular</MenuItem>
              <MenuItem value="Price: Low to High">Price: Low to High</MenuItem>
              <MenuItem value="Price: High to Low">Price: High to Low</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={3}>
          {filteredPackageList.map((packageData, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <DestinationCard packageData={packageData} imagePath={imagePath} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default TravelDestinations;
