import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Paper, Typography, FormHelperText } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { AuthContext } from '../../../../GlobalContext';
import { toast } from 'react-toastify';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

const AddGallery = () => {
  const navigate = useNavigate();
  const { host,setGalleryCount } = useContext(AuthContext);
  const [newImage, setNewImage] = useState({
    title: '',
    date: '',
    description: '',
    location: '',
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [video, setVideo] = useState(null);
const [videoPreview, setVideoPreview] = useState(null);


  const [errors, setErrors] = useState({}); // For storing validation errors

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // Set the image preview URL
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file)); // Set the video preview URL
    }
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewImage({ ...newImage, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newImage.title) newErrors.title = 'Title is required';
    if (!newImage.date) newErrors.date = 'Date is required';
    if (newImage.date < today) newErrors.date = 'Date must be in the future';
    if (!newImage.description) newErrors.description = 'Description is required';
    if (!newImage.location) newErrors.location = 'Location is required';
    if (!image) newErrors.image = 'Image is required';
    if (!video) newErrors.video = 'Video is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    const formData = new FormData();
    formData.append('title', newImage.title);
    formData.append('date', newImage.date);
    formData.append('description', newImage.description);
    formData.append('location', newImage.location);
    formData.append('thumbnail', image);
    formData.append('video', video); // Append video file
    axios.post(`${host}/api/admin/addgallery`, formData)
      .then((res) => {
        if (res.data.status) {
          toast?.success(res?.data?.message);
          setGalleryCount((prev)=>prev+1)
          navigate('/admin/gallery-list');
        } else {
          toast?.error(res?.data?.message);

          console.log('No data');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  

  return (
    <div>

<Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Add New Gallery Item
      </Typography>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Provide the details for the new gallery item below. Ensure that the image and details are accurate.
      </Typography>


      <StyledPaper>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            color: '#ff4081',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
            marginBottom: '30px',
          }}
        >
          GALLERY
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={newImage.title}
              onChange={handleInputChange}
              variant="outlined"
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={newImage.date}
              onChange={handleInputChange}
              variant="outlined"
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: today }} // Set min date to today
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={newImage.location}
              onChange={handleInputChange}
              variant="outlined"
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newImage.description}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={4}
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          <Grid item xs={12}>

          {imagePreview && (
              <div style={{ marginTop: '10px',textAlign:'center' }}>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{width:'250px' }}
                />
              </div>
            )}

            <input
              accept="image/*"
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="thumbnail">
              <Button variant="outlined" component="span" fullWidth>
                {image ? image.name : 'Upload Thumbnail'}
              </Button>
            </label>
            
            {errors.image && (
              <FormHelperText error>{errors.image}</FormHelperText>
            )}
          </Grid>


          <Grid item xs={12}>
  {videoPreview && (
    <div style={{ marginTop: '10px', textAlign: 'center' }}>
      <video width="250" controls>
        <source src={videoPreview} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )}

  <input
    accept="video/*"
    type="file"
    id="video"
    name="video"
    onChange={handleVideoChange}
    style={{ display: 'none' }}
  />
  <label htmlFor="video">
    <Button variant="outlined" component="span" fullWidth>
      {video ? video.name : 'Upload Video'}
    </Button>
  </label>

  {errors.video && (
    <FormHelperText error>{errors.video}</FormHelperText>
  )}
</Grid>


          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px', marginBottom: '20px' }}>
            <Button
            fullWidth
              variant="contained"
              sx={{
                backgroundColor: '#ff4081',
                color: 'white',
                '&:hover': {
                  backgroundColor: '#212121',
                },
              }}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </StyledPaper>
    </div>
  );
};

export default AddGallery;
