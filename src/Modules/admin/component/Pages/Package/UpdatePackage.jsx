import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { host, imagePath, setPackageCount } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [packageData, setPackageData] = useState({
    name: '',
    description: '',
    price: 0,
    destination: '',
    startDate: '',
    endDate: '',
    days: [],
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

  useEffect(() => {
    const fetchPackageData = async () => {
      try {
        const res = await axios.get(`${host}/api/package/getSinglePackage/${id}`);
        const data = res?.data.package || {};
        // Format dates for date inputs
        const formattedData = {
          ...data,
          startDate: data?.startDate ? data?.startDate?.split('T')[0] : '',
          endDate: data?.endDate ? data?.endDate?.split('T')[0] : '',
        };
        setPackageData(formattedData);
      } catch (error) {
        console.error('Error fetching package:', error);
      }
    };
    fetchPackageData();
  }, [id,]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDayChange = (index, value) => {
    setPackageData((prevData) => {
      const updatedDays = [...prevData.days];
      updatedDays[index] = value;
      return {
        ...prevData,
        days: updatedDays,
      };
    });
  };

  const handleAddDay = () => {
    setPackageData((prevPackage) => {
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
    setPackageData((prevPackage) => {
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
    const file = e.target.files?.[0];
    setImage(file);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!packageData.startDate) newErrors.startDate = 'Start Date is required';
    if (!packageData.endDate) newErrors.endDate = 'End Date is required';


    // Validate that startDate and endDate are not in the past
    const currentDate = new Date().setHours(0, 0, 0, 0); // Set time to midnight
    const startDate = new Date(packageData.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(packageData.endDate).setHours(0, 0, 0, 0);

    if (startDate < currentDate) {
      newErrors.startDate = 'Start Date cannot be in the past';
    }
    if (endDate < currentDate) {
      newErrors.endDate = 'End Date cannot be in the past';
    }
    // Validate that endDate is not before startDate and at least one day is included
    if (startDate && endDate) {
      if (endDate < startDate) {
        newErrors.endDate = 'End Date cannot be before Start Date';
      }

      const timeDifference = endDate - startDate;
      const dayDifference = timeDifference / (1000 * 3600 * 24);

      if (dayDifference < 0) {
        newErrors.endDate = 'End Date must be at least one day after Start Date';
      }
    }


    // Check that individual days entries are not empty strings
    packageData?.days?.forEach((day, index) => {
      if (day.trim() === '') {
        newErrors[`day_${index}`] = `Day ${index + 1} cannot be empty`;
      }
    });

    if (!packageData.name) newErrors.name = 'Name is required';
    if (!packageData?.description || packageData?.description?.trim()?.length < 10)
      newErrors.description = 'Description is required and must be at least 10 characters';
    if (!packageData.price || packageData.price <= 0) newErrors.price = 'Price must be a positive number';
    if (packageData.numberOfAdults < 0) {
      newErrors.numberOfAdults = 'Number must be a positive number';
    }
    if (packageData.numberOfChildren < 0) {
      newErrors.numberOfChildren = 'Number must be a positive number';
    }
    if (!packageData.destination) newErrors.destination = 'Destination is required';
    if (packageData.familyPackage === 'Yes' && (!packageData.totalMembersPerFamily || packageData.totalMembersPerFamily <= 0))
      newErrors.totalMembersPerFamily = 'Total Members Per Family must be a positive number';
    if (!packageData.guideName) newErrors.guideName = 'Guide Name is required';
    if (!packageData.email || !/\S+@\S+\.\S+/.test(packageData.email)) newErrors.email = 'Valid email is required';
    if (!packageData.phoneNumber || !/^\d+$/.test(packageData.phoneNumber)) newErrors.phoneNumber = 'Valid phone number is required';
    if (packageData?.days?.length === 0) newErrors.days = 'At least one day is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  useEffect(() => {
    const { startDate, endDate } = packageData;
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const newDaysArray = [];
      // Create new days array based on new startDate and endDate
      while (start <= end) {
        newDaysArray.push(""); // Add an empty string for each day in the range
        start.setDate(start.getDate() + 1);
      }
      // Update days only if the number of days has changed
      if (newDaysArray.length !== packageData.days.length) {
        setPackageData(prevPackage => ({
          ...prevPackage,
          days: newDaysArray
        }));
      }
    } else {
      setPackageData(prevPackage => ({
        ...prevPackage,
        days: []
      }));
    }
  }, [packageData.startDate, packageData.endDate]);



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('name', packageData?.name);
    formData.append('description', packageData?.description);
    formData.append('price', packageData?.price);
    formData.append('destination', packageData?.destination);
    formData.append('startDate', packageData?.startDate);
    formData.append('endDate', packageData?.endDate);
    formData.append('days', JSON.stringify(packageData?.days));
    formData.append('accommodation', packageData?.accommodation);
    formData.append('transportation', packageData?.transportation);
    formData.append('meals', packageData?.meals);
    formData.append('numberOfAdults', packageData?.numberOfAdults);
    formData.append('numberOfChildren', packageData?.numberOfChildren);
    formData.append('familyPackage', packageData?.familyPackage);
    formData.append('totalMembersPerFamily', packageData?.totalMembersPerFamily);
    formData.append('specialRequests', packageData?.specialRequests);
    formData.append('guideName', packageData?.guideName);
    formData.append('email', packageData?.email);
    formData.append('phoneNumber', packageData?.phoneNumber);

    if (image) formData.append('thumbnail', image);
    axios?.put(`${host}/api/package/updatePackage/${id}`, formData)
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          setPackageCount((prev) => prev + 1)
          navigate('/admin/packages-list');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating package:', error);
        toast.error('Failed to update package');
      });
  };

  const today = new Date().toISOString().split('T')[0];
  const imagePreviewUrl = image ? URL.createObjectURL(image) : packageData?.thumbnail;

  return (
    <div>
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
          Edit Package
        </Typography>
        <Box sx={{ backgroundColor: packageData?.status == "expired" ? 'red' : 'green', borderTopLeftRadius: 5, borderBottomRightRadius: 15, border: '1px solid white', mb: 3, width: 100 }}>
          <Typography sx={{ padding: 1, color: 'white' }}>
            {packageData?.status == "expired" ? 'Expired' : 'Active'}
          </Typography>
        </Box>

        <Grid container spacing={2}>
          {/* Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              required
              value={packageData?.name || ''}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.name}
              helperText={errors?.name}
            />
          </Grid>

          {/* Price */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Price"
              name="price"
              required
              type="number"
              value={packageData?.price || ''}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.price}
              helperText={errors?.price}
            />
          </Grid>

          {/* Destination */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Destination"
              name="destination"
              required
              value={packageData?.destination || ''}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.destination}
              helperText={errors?.destination}
            />
          </Grid>

          {/* Start Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Start Date"
              name="startDate"
              type="date"
              required
              value={packageData?.startDate || ''}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: today } }}
              error={!!errors?.startDate}
              helperText={errors?.startDate}
            />
          </Grid>

          {/* End Date */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="End Date"
              name="endDate"
              type="date"
              required
              value={packageData?.endDate || ''}
              onChange={handleChange}
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: packageData?.startDate || today } }}
              error={!!errors?.endDate}
              helperText={errors?.endDate}
            />
          </Grid>



          {/* Accommodation */}
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Accommodation</FormLabel>
              <RadioGroup
                name="accommodation"
                value={packageData?.accommodation || 'No'}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Transportation */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Transportation"
              name="transportation"
              select
              value={packageData?.transportation || 'car'}
              onChange={handleChange}
              variant="outlined"
            >
              <MenuItem value="car">Car</MenuItem>
              <MenuItem value="bus">Bus</MenuItem>
              <MenuItem value="train">Train</MenuItem>
              <MenuItem value="plane">Plane</MenuItem>
            </TextField>
          </Grid>

          {/* Meals */}
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Meals</FormLabel>
              <RadioGroup
                name="meals"
                value={packageData?.meals || 'No'}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Number of Adults */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Adults"
              name="numberOfAdults"
              type="number"
              value={packageData?.numberOfAdults || 0}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.numberOfAdults}
              helperText={errors?.numberOfAdults}
            />
          </Grid>

          {/* Number of Children */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Number of Children"
              name="numberOfChildren"
              type="number"
              value={packageData?.numberOfChildren || 0}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.numberOfChildren}
              helperText={errors?.numberOfChildren}
            />
          </Grid>

          {/* Family Package */}
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Family Package</FormLabel>
              <RadioGroup
                name="familyPackage"
                value={packageData?.familyPackage || 'No'}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Total Members Per Family */}
          {packageData?.familyPackage === 'Yes' && (
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Members Per Family"
                name="totalMembersPerFamily"
                type="number"
                value={packageData?.totalMembersPerFamily || 0}
                onChange={handleChange}
                variant="outlined"
                error={!!errors?.totalMembersPerFamily}
                helperText={errors?.totalMembersPerFamily}
              />
            </Grid>
          )}

          {/* Special Requests */}
          <Grid item xs={12} sm={6}>
            <FormControl>
              <FormLabel>Special Requests</FormLabel>
              <RadioGroup
                name="specialRequests"
                value={packageData?.specialRequests || 'No'}
                onChange={handleChange}
                row
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>
          </Grid>

          {/* Guide Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Guide Name"
              name="guideName"
              value={packageData?.guideName || ''}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.guideName}
              helperText={errors?.guideName}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={packageData?.email || ''}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.email}
              helperText={errors?.email}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={packageData?.phoneNumber || ''}
              onChange={handleChange}
              variant="outlined"
              error={!!errors?.phoneNumber}
              helperText={errors?.phoneNumber}
            />
          </Grid>

          {/* Thumbnail */}
          <Grid item xs={12} sm={6}>
            <Typography>Thumbnail</Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="thumbnail-upload"
              type="file"
              onChange={handleImageChange}
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

            {image ? (
              <Box sx={{ marginTop: '10px' }}>
                <img src={`${imagePreviewUrl}`} alt="Thumbnail Preview" width="100" />
              </Box>
            ) : (
              <Box sx={{ marginTop: '10px' }}>
                <img src={`${imagePath}/${packageData?.thumbnail}`} alt="Thumbnail Preview" width="100" />
              </Box>
            )}

            {errors?.thumbnail && <Typography color="error">{errors?.thumbnail}</Typography>}


          </Grid>


          <Grid item xs={12}>
            {packageData?.days?.map((day, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <TextField
                  fullWidth
                  label={`Day ${index + 1}`}
                  value={day}
                  onChange={(e) => handleDayChange(index, e.target.value)}
                  variant="outlined"
                  sx={{ marginRight: '10px' }}
                  error={!!errors[`day_${index}`]} // Apply error styling if there is an error for this day
                  helperText={errors[`day_${index}`]} // Display specific error message for this day
                />
                <IconButton color="error" onClick={() => handleRemoveDay(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button onClick={handleAddDay} startIcon={<AddIcon />} variant="contained">
              Add Day
            </Button>
          </Grid>

          
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#ff4081',  // Base color
                color: 'white',
                '&:hover': {
                  backgroundColor: '#ff80a1',  // Lighter shade for hover
                },
              }}
              onClick={handleSubmit}
            >
              Update Package
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EditPackage;
