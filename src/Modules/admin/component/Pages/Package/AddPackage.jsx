import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  TextField,
  MenuItem,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
  IconButton,
  Box,
  FormControl,
  FormLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { AuthContext } from '../../../../GlobalContext';
import { toast } from 'react-toastify';

const ManagePackages = () => {
  const navigate = useNavigate();
  const { host, setPackageCount } = useContext(AuthContext);
  const [image, setImage] = useState({});
  const [errors, setErrors] = useState({});
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    price: 0,
    destination: '',
    startDate: '',
    endDate: '',
    days: [],  // Replace itineraries with days
    accommodation: 'No',
    transportation: 'car',
    meals: 'No',
    numberOfAdults: 0,
    numberOfChildren: 0,
    familyPackage: 'No',
    totalMembersPerFamily: 0,
    specialRequests: 'No',
    guideName: '',
    email: '',
    phoneNumber: '',
    thumbnail: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPackage((prevPackage) => ({
      ...prevPackage,
      [name]: value,
    }));
  };

  const handleDayChange = (index, value) => {
    setNewPackage((prevPackage) => {
      const updatedDays = [...prevPackage.days];
      updatedDays[index] = value;
      return {
        ...prevPackage,
        days: updatedDays,
      };
    });
  };

  const handleAddDay = () => {
    setNewPackage((prevPackage) => {
      // Check if startDate and endDate are selected
      if (!prevPackage.startDate || !prevPackage.endDate) {
        // Display toast message
        toast.error('Please select start and end dates first.');
        return prevPackage; // Do not modify the state
      }
      // Parse the current endDate and increment it by one day
      const currentEndDate = new Date(prevPackage.endDate);
      currentEndDate.setDate(currentEndDate.getDate() + 1);
      // Format the new endDate to YYYY-MM-DD
      const newEndDate = currentEndDate.toISOString().split('T')[0];
      // Create a new array of days, extending it with one more day
      const updatedDays = [...prevPackage.days, ''];
      return {
        ...prevPackage,
        endDate: newEndDate,  // Update the endDate
        days: updatedDays,  // Update the days array
      };
    });
  };


  const handleRemoveDay = (index) => {
    setNewPackage((prevPackage) => {
      const updatedDays = [...prevPackage.days];
      updatedDays.splice(index, 1); // Remove the selected day
      if (updatedDays.length === 0) {
        // If no days left, clear the startDate and endDate
        return {
          ...prevPackage,
          startDate: '',
          endDate: '',
          days: updatedDays,
        };
      } else {
        // Decrease the endDate by one day if days array is not empty
        const newEndDate = new Date(prevPackage.endDate);
        newEndDate.setDate(newEndDate.getDate() - 1);
        return {
          ...prevPackage,
          endDate: newEndDate.toISOString().split('T')[0],
          days: updatedDays,
        };
      }
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage({ thumbnail: file });
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if startDate and endDate are not empty
    if (!newPackage.startDate) {
      newErrors.startDate = 'Start Date is required';
    }

    if (!newPackage.endDate) {
      newErrors.endDate = 'End Date is required';
    }

    // Validate that endDate is not before startDate and at least one day is included
    if (newPackage.startDate && newPackage.endDate) {
      const start = new Date(newPackage.startDate);
      const end = new Date(newPackage.endDate);

      if (end < start) {
        newErrors.endDate = 'End Date cannot be before Start Date';
      }

      const timeDifference = end.getTime() - start.getTime();
      const dayDifference = timeDifference / (1000 * 3600 * 24);
      if (dayDifference < 0) {
        newErrors.endDate = 'End Date must be at least one day after Start Date';
      }
    }

    // Check that individual days entries are not empty strings
    newPackage?.days?.forEach((day, index) => {
      if (day.trim() === '') {
        newErrors[`day_${index}`] = `Day ${index + 1} cannot be empty`;
      }
    });

    // Other existing validations
    if (!newPackage.name) newErrors.name = 'Name is required';
    if (!newPackage.description || newPackage.description.trim().length < 10)
      newErrors.description = 'Description is required and must be at least 10 characters';

    if (newPackage.numberOfAdults < 0) {
      newErrors.numberOfAdults = 'Number must be a positive number';
    }

    if (newPackage.numberOfChildren < 0) {
      newErrors.numberOfChildren = 'Number must be a positive number';
    }


    if (!newPackage.price || newPackage.price <= 0) newErrors.price = 'Price must be a positive number';
    if (!newPackage.destination) newErrors.destination = 'Destination is required';
    if (newPackage.familyPackage === 'Yes' && (!newPackage.totalMembersPerFamily || newPackage.totalMembersPerFamily <= 0))
      newErrors.totalMembersPerFamily = 'Total Members Per Family must be a positive number';
    if (!newPackage.guideName) newErrors.guideName = 'Guide Name is required';
    if (!newPackage.email || !/\S+@\S+\.\S+/.test(newPackage.email)) newErrors.email = 'Valid email is required';
    if (!newPackage.phoneNumber || !/^\d+$/.test(newPackage.phoneNumber)) newErrors.phoneNumber = 'Valid phone number is required';
    if (!image.thumbnail) newErrors.thumbnail = 'Image is required';  // Validate image
    if (newPackage.days.length === 0) newErrors.days = 'At least one day is required';  // Validate days

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const { startDate, endDate } = newPackage;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const newDaysArray = [];

      // Create a new array of days based on the new date range
      while (start <= end) {
        newDaysArray.push(""); // Add an empty string for each day in the range
        start.setDate(start.getDate() + 1);
      }

      // If the length of newDaysArray is different from the current days array length,
      // update the days array
      setNewPackage(prevPackage => {
        // Preserve existing days data that falls within the new range
        const preservedDays = prevPackage.days.slice(0, newDaysArray.length);
        return {
          ...prevPackage,
          days: newDaysArray.length === prevPackage.days.length ? preservedDays : newDaysArray
        };
      });
    } else {
      setNewPackage(prevPackage => ({
        ...prevPackage,
        days: []
      }));
    }
  }, [newPackage.startDate, newPackage.endDate]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', newPackage.name);
    formData.append('description', newPackage.description);
    formData.append('price', newPackage.price);
    formData.append('destination', newPackage.destination);
    formData.append('startDate', newPackage.startDate);
    formData.append('endDate', newPackage.endDate);
    formData.append('days', JSON.stringify(newPackage.days));  // Change itineraries to days
    formData.append('accommodation', newPackage.accommodation);
    formData.append('transportation', newPackage.transportation);
    formData.append('meals', newPackage.meals);
    formData.append('numberOfAdults', newPackage.numberOfAdults);
    formData.append('numberOfChildren', newPackage.numberOfChildren);
    formData.append('familyPackage', newPackage.familyPackage);
    formData.append('totalMembersPerFamily', newPackage.totalMembersPerFamily);
    formData.append('specialRequests', newPackage.specialRequests);
    formData.append('guideName', newPackage.guideName);
    formData.append('email', newPackage.email);
    formData.append('phoneNumber', newPackage.phoneNumber);
    if (image.thumbnail) formData.append('thumbnail', image.thumbnail);

    axios
      .post(`${host}/api/package/packageInsert`, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res?.data?.message);
          navigate('/admin/packages-list');
          setPackageCount((prev) => prev + 1)
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((error) => {
        console.error('Error adding package:', error);
      });
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Image preview URL
  const imagePreviewUrl = image.thumbnail ? URL.createObjectURL(image.thumbnail) : '';
  return (
    <div>

      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Add New Package
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Fill out the details below to add a new package to the system. Ensure all fields are completed correctly.
      </Typography>


      <Paper style={{ padding: '20px', marginBottom: '20px', borderRadius: '20px' }}>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#ff4081',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '30px',
            fontSize: '35px',
          }}
        >
          Manage Packages
        </Typography>
        <Grid container spacing={2}>
          {/* Form fields */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              required
              value={newPackage.name}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.name}
              helperText={errors.name}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              required
              type="number"
              value={newPackage.price}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.price}
              helperText={errors.price}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              required
              value={newPackage.destination}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.destination}
              helperText={errors.destination}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              required
              value={newPackage.startDate}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: today } }}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              required
              value={newPackage.endDate}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: today } }}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Accommodation"
              name="accommodation"
              value={newPackage.accommodation}
              onChange={handleChange}
              variant="outlined"
              select
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transportation"
              name="transportation"
              value={newPackage.transportation}
              onChange={handleChange}
              variant="outlined"
              select
            >
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="bus">Bus</MenuItem>
              <MenuItem value="train">Train</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Meals"
              name="meals"
              value={newPackage.meals}
              onChange={handleChange}
              variant="outlined"
              select
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
              value={newPackage.numberOfAdults}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.numberOfAdults}
              helperText={errors.numberOfAdults}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Children"
              name="numberOfChildren"
              type="number"
              value={newPackage.numberOfChildren}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.numberOfChildren}
              helperText={errors.numberOfChildren}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Family Package</FormLabel>
              <RadioGroup
                name="familyPackage"
                value={newPackage.familyPackage}
                onChange={handleChange}
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {newPackage.familyPackage === 'Yes' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Members Per Family"
                name="totalMembersPerFamily"
                type="number"
                value={newPackage.totalMembersPerFamily}
                onChange={handleChange}
                variant="outlined"
                error={!!errors.totalMembersPerFamily}
                helperText={errors.totalMembersPerFamily}
              />
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Special Requests"
              name="specialRequests"
              value={newPackage.specialRequests}
              onChange={handleChange}
              variant="outlined"
              select
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Guide Name"
              name="guideName"
              value={newPackage.guideName}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.guideName}
              helperText={errors.guideName}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={newPackage.email}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              value={newPackage.phoneNumber}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={newPackage.description}
              onChange={handleChange}
              variant="outlined"
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>

          <Grid item xs={12}>
            <input
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
              id="thumbnail-upload"
            />
            <label htmlFor="thumbnail-upload">
              <Button variant="contained" component="span"
                style={{
                  backgroundColor: 'rgba(255, 105, 180, 0.65)',  // Base color
                }}
                startIcon={<AddIcon />}>
                Upload Thumbnail
              </Button>
            </label>
            {imagePreviewUrl && (
              <Box mt={2}>
                <img
                  src={imagePreviewUrl}
                  alt="Thumbnail Preview"
                  style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
                />
              </Box>
            )}
            {errors.thumbnail && <Typography color="error">{errors.thumbnail}</Typography>}
          </Grid>
          
          <Grid item xs={12}>
            {newPackage.days.map((day, index) => (
              <Box key={index} display="flex" alignItems="center" mb={1}>
                <TextField
                  fullWidth
                  label={`Day ${index + 1}`}
                  value={day}
                  onChange={(e) => handleDayChange(index, e.target.value)}
                  variant="outlined"
                  error={!!errors[`day_${index}`]} // Show error style if error exists for this day
                  helperText={errors[`day_${index}`]} // Display the specific error message
                />
                <IconButton onClick={() => handleRemoveDay(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={handleAddDay}>
              Add Day
            </Button>

            {/* Display general days error if any */}
            {errors.days && <Typography color="error">{errors.days}</Typography>}
          </Grid>

          <Grid item xs={12}>
            <Button variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#ff4081',  // Base color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ff80a1',  // Lighter shade for hover
                },
              }}
              onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ManagePackages;
