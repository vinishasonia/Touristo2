import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

const UpdateGallery = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get the gallery ID from URL params
    const { host, imagePath, setGalleryCount } = useContext(AuthContext);
    const [galleryItem, setGalleryItem] = useState({
        title: '',
        date: '',
        description: '',
        location: '',
        thumbnail: '',
        video: ''
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null); // State for image preview
    const [video, setVideo] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [errors, setErrors] = useState({}); // For storing validation errors

    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        // Fetch the gallery item data when the component mounts
        axios.get(`${host}/api/admin/singlegallery/${id}`)
            .then((res) => {
                if (res.data.status) {
                    const data = res.data.gallery;
                    const formattedData = {
                        ...data,
                        date: data?.date ? new Date(data?.date).toISOString().split('T')[0] : '',
                    };

                    setGalleryItem(formattedData);
                    setImagePreview(data.thumbnail ? `${imagePath}/${data.thumbnail}` : null); // Update preview with existing image
                    setVideoPreview(data.video ? `${imagePath}/${data.video}` : null); // Update preview with existing video
                } else {
                    console.log("Error: Couldn't fetch gallery item");
                }
            })
            .catch((err) => {
                console.error('Error fetching gallery item:', err);
            });
    }, [id,]);


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
            setVideoPreview(null); // Set the video preview URL
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setGalleryItem({ ...galleryItem, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!galleryItem.title) newErrors.title = 'Title is required';
        if (!galleryItem.date) newErrors.date = 'Date is required';
        if (galleryItem.date < today) newErrors.date = 'Date must be in the future';
        if (!galleryItem.description) newErrors.description = 'Description is required';
        if (!galleryItem.location) newErrors.location = 'Location is required';
        if (!image && !galleryItem.thumbnail) newErrors.image = 'Image is required';
        if (!video && !galleryItem.video) newErrors.video = 'Video is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) return;
        const formData = new FormData();
        formData.append('title', galleryItem.title);
        formData.append('date', galleryItem.date);
        formData.append('description', galleryItem.description);
        formData.append('location', galleryItem.location);
        if (image) formData.append('thumbnail', image);
        if (video) formData.append('video', video);

        axios.put(`${host}/api/admin/updategallery/${id}`, formData)
            .then((res) => {
                if (res.data.status) {
                    navigate('/admin/gallery-list');
                    setGalleryCount((prev) => prev + 1)
                    toast.success(res.data.message);
                } else {
                    toast.error(res.data.message);
                    console.log('No data or failed to update');
                }
            })
            .catch((err) => {
                console.error('Error updating gallery item:', err);
            });
    };

    return (
        <div>
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
                    EDIT GALLERY
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={galleryItem.title}
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
                            value={galleryItem.date}
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
                            value={galleryItem.location}
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
                            value={galleryItem.description}
                            onChange={handleInputChange}
                            variant="outlined"
                            multiline
                            rows={4}
                            error={!!errors.description}
                            helperText={errors.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            {imagePreview ? (
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{ width: '250px' }}
                                />
                            ) : (
                                <div>No Image Selected</div>
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
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ marginTop: '10px', textAlign: 'center' }}>
                            {video && (
                              <>
                                <video width="250" controls>
                                    Your browser does not support the video tag.
                                </video>
                                <Typography>
                                Video Preview is not Available
                                </Typography>
                              </>
                            )}
                            {videoPreview && (
                                <video width="250" controls>
                                    <source src={videoPreview} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>

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
                        </div>
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

export default UpdateGallery;
