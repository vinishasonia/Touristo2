import React, { useContext, useState, useEffect } from 'react';
import { Container, Box, Typography, Grid, Button, Select, MenuItem, FormControl, InputLabel, TextField, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Add this import for navigation
import { AuthContext } from '../../../../GlobalContext';
import banner1 from "../../../../../Images/contentBanner1.jpg";
import banner2 from "../../../../../Images/contentBanner2.jpg";

const TopSection = ({ locations, onSearch }) => {
    const [selectedLocation, setSelectedLocation] = useState('All');
    const [persons, setPersons] = useState(2); // Set default to 2

    const handleLocationChange = (event) => {
        setSelectedLocation(event.target.value);
    };

    const handlePersonsChange = (event) => {
        const value = parseInt(event.target.value, 10);
        if (!isNaN(value) && value > 0) {
            setPersons(value);
        } else {
            setPersons('');
        }
    };

    const handleFindTrip = () => {
        onSearch({
            location: selectedLocation,
            persons,
        });
    };

    return (
        <Box sx={{
            p: 3, backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: 2, mt: -8
        }}>
            <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel>Location</InputLabel>
                        <Select
                            value={selectedLocation}
                            onChange={handleLocationChange}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {locations.map(location => (
                                <MenuItem key={location} value={location}>{location}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        fullWidth
                        label="Persons"
                        type="number"
                        value={persons}
                        onChange={handlePersonsChange}
                        inputProps={{ min: "1", step: "1" }}
                    />
                </Grid>
                <Grid item xs={12} md={2}>
                    <Button
                        variant="contained"
                        color="success"
                        fullWidth
                        sx={{ height: '100%' }}
                        onClick={handleFindTrip}
                    >
                        Find Trip
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

const InfoSection = () => {
    return (
        <Grid container spacing={4} alignItems="center">
           <Box sx={{paddingX:10}}>
               <Typography variant="h2" gutterBottom>
                    Explore Your Next Adventure
                </Typography>
                <Typography variant="subtitle1" color="textSecondary" paragraph>
                    Discover breathtaking destinations and travel experiences tailored just for you.
                </Typography>
           </Box>
            <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                    <img src={banner1} alt="Travel Image 1" style={{ borderRadius: '50%', width: '200px', height: '200px', objectFit: 'cover', right: '-50px', position: 'relative' }} />
                    <img src={banner2} alt="Travel Image 2" style={{ borderRadius: '50%', width: '300px', height: '300px', objectFit: 'cover', position: 'relative', top: '-30px' }} />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Typography variant="h4" gutterBottom>
                    We help you find your dream vacation
                </Typography>
                <Typography variant="body1" color="textSecondary" paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam, purus sit amet luctus venenatis, lectus magna fringilla urna, porttitor rhoncus dolor purus non enim praesent elementum facilisis leo, vel
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={6} md={3}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            100+
                        </Typography>
                        <Typography variant="body2">Holiday Packages</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            201
                        </Typography>
                        <Typography variant="body2">Luxury Hotels</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            15
                        </Typography>
                        <Typography variant="body2">Elite Airlines</Typography>
                    </Grid>
                    <Grid item xs={6} md={3}>
                        <Typography variant="h6" color="primary" gutterBottom>
                            120M+
                        </Typography>
                        <Typography variant="body2">Satisfied Travelers</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

const PackagesSection = ({ packages, imagePath }) => {
    const navigate = useNavigate(); // Initialize navigation hook

    const handleCardClick = (packageId) => {
        navigate(`/package-detail/${packageId}`, { state: { fromPackage: true } });
    };

    return (
        <Grid container spacing={3} mt={3}>
            {packages?.length === 0 && (
                <Box sx={{ paddingX: 5 }}>
                    <Typography variant="h6" align="center" color="textSecondary">
                        No Package Available for This number
                    </Typography>
                </Box>
            )}

            {packages.map(pkg => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={pkg._id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={() => handleCardClick(pkg._id)}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image={`${imagePath}/${pkg.thumbnail}` || "https://via.placeholder.com/300x200"}
                                alt={pkg.name}
                            />
                            <CardContent>
                                <Typography variant="subtitle1">{pkg?.name}</Typography>
                                <Typography variant="subtitle2" color="textSecondary">{`Location: ${pkg?.destination}`}</Typography>
                                <Typography variant="h6" color="primary">{`Price: ₹${pkg?.price}`}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

const DreamVacationUI = () => {
    const { packageList, imagePath } = useContext(AuthContext);
    const [locations, setLocations] = useState([]);
    const [filteredPackages, setFilteredPackages] = useState([]);

    useEffect(() => {
        const uniqueLocations = Array.from(new Set(packageList.map(pkg => pkg.destination)));
        setLocations(uniqueLocations);
        // Apply default filters when the component mounts
        handleSearch({ location: 'All', persons: 2 });
    }, [packageList]);
   
    
    const handleSearch = (filters) => {
        const { location, persons } = filters;
        let filtered = packageList;
        // Filter by location
        if (location && location !== 'All') {
            filtered = filtered.filter(pkg => pkg.destination === location);
        }
        // Filter by number of persons
        if (persons) {
            filtered = filtered.filter(pkg => {
                const totalMembers = (pkg.totalMembersPerFamily || 0) + (pkg.numberOfAdults || 0) + (pkg.numberOfChildren || 0);
                return totalMembers === persons; // Only show packages where total members equals the number of persons
            });
        }
        setFilteredPackages(filtered);
    };
    
    

    return (
        <Container sx={{ my: 25, mt: 20 }}>
            <TopSection locations={locations} onSearch={handleSearch} />
            <PackagesSection packages={filteredPackages} imagePath={imagePath} />
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, py: 7 }} />
            <InfoSection />
        </Container>
    );
};

export default DreamVacationUI;
