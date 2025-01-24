import React, { useState, useRef, useContext } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Grid, Divider } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../../GlobalContext'; // Adjust the import path as needed

const Feedback = () => {
    const { feedback, setFeedbackCount, host } = useContext(AuthContext);

    const [selectedFeedback, setSelectedFeedback] = useState(null);
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const sliderRef = useRef(null);

    const handleFeedbackClick = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name) newErrors.name = 'Name is required';
        if (!form.email) newErrors.email = 'Email is required';
        if (!form.message) newErrors.message = 'Message is required';
        else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Email is invalid';
        return newErrors;
    };

    const handleFormSubmit = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        try {
            const response = await axios.post(`${host}/api/admin/addfeedback`, form);
            if (response.data.success) {
                toast.success(response.data.message);
                setForm({ name: '', email: '', message: '' });
                setErrors({});
                setFeedbackCount((prevCount) => prevCount + 1);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting feedback');
        }
    };

    const handleClose = () => setSelectedFeedback(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <Box sx={{ width: '100%', mb: 15, mt: 8, position: 'relative', px: 0, paddingX: 5 }}>
            {feedback.length ===0&&(
                <Box sx={{ paddingX: 5,mb:5 }}>
                    <Typography variant="h6" align="center" color="textSecondary">
                        No Feedback Available
                    </Typography>
                </Box>
            )}
            {feedback.length > 1 ? (
                <>
                    <Slider {...settings} ref={sliderRef}>
                        {feedback.map((item, index) => (
                            <Box key={index} sx={{ px: 1, position: 'relative' }}>
                                <Card
                                    elevation={0}
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        borderRadius: '12px',
                                        backgroundColor: '#fff',
                                        transition: 'transform 0.3s',
                                        '&:hover': {
                                            transform: 'scale(1.03)',
                                            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                                        },
                                        position: 'relative',
                                        overflow: 'hidden',
                                        cursor: 'pointer',
                                        margin:2
                                    }}
                                    onClick={() => handleFeedbackClick(item)}
                                >
                                    <CardContent sx={{textAlign:'center'}}>
                                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{item.name}</Typography>
                                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.email}</Typography>
                                        <Typography variant="body1" sx={{ my: 1, color: 'text.primary' }}>
                                            {item.message}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Box>
                        ))}
                    </Slider>

                    {/* Custom Navigation Icons */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
                        <Button
                            onClick={() => sliderRef.current.slickPrev()}
                            sx={{
                                minWidth: 0,
                                borderRadius: '50%',
                                p: 1,
                                bgcolor: 'background.paper',
                                '&:hover': {
                                    bgcolor: 'background.default',
                                }
                            }}
                        >
                            <ArrowBackIos sx={{ color: 'primary.main' }} /> Prev
                        </Button>
                        <Button
                            onClick={() => sliderRef.current.slickNext()}
                            sx={{
                                minWidth: 0,
                                borderRadius: '50%',
                                p: 1,
                                bgcolor: 'background.paper',
                                '&:hover': {
                                    bgcolor: 'background.default',
                                }
                            }}
                        >
                            Next <ArrowForwardIos sx={{ color: 'primary.main' }} />
                        </Button>
                    </Box>
                </>
            ) : (
                feedback.length === 1 && (
                    <Card
                        elevation={0}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                            borderRadius: '12px',
                            backgroundColor: '#fff',
                            position: 'relative',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            mx: 'auto',
                            mb: 2,
                            maxWidth: 600
                        }}
                        onClick={() => handleFeedbackClick(feedback[0])}
                    >
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{feedback[0].name}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>{feedback[0].email}</Typography>
                            <Typography variant="body1" sx={{ my: 1, color: 'text.primary' }}>
                                {feedback[0].message}
                            </Typography>
                        </CardContent>
                    </Card>
                )
            )}

            <Divider />

            <Box sx={{ width: '100%', my: 2, px: 2 }}>
                <Box sx={{ mb: 4, textAlign: 'center' }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
                        We Value Your Feedback
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                        Please fill out the form below to share your thoughts. Your insights are invaluable in helping us
                        enhance our services and provide a better travel experience.
                    </Typography>
                </Box>
            </Box>

            {/* Feedback form */}
            <Box
                sx={{
                    mt: 4,
                    mx: 'auto',
                    maxWidth: 400,
                    padding: 2,
                    borderRadius: '8px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.name}
                            helperText={errors.name}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            name="email"
                            value={form.email}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Message"
                            name="message"
                            value={form.message}
                            onChange={handleFormChange}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                            error={!!errors.message}
                            helperText={errors.message}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleFormSubmit}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Feedback;
