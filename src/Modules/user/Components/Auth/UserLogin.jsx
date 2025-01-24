import React, { useState, useEffect, useContext } from 'react';
import { Box, TextField, Button, Typography, Fade } from '@mui/material';
import { styled } from '@mui/system';
import { AuthContext } from '../../../GlobalContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../Auth/bg_1.jpg';
import { Icon } from '@iconify/react';

// Define styles for the GradientBox
const GradientBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `url(${bg}) no-repeat center center/cover`, // Adjust image path
        filter: 'blur(2px)', // Apply blur effect to the background image
        zIndex: -1, // Place the image behind other content
        backgroundSize: 'cover',
    },
});

// Define styles for the Logo
const Logo = styled("div")({
    position: 'absolute',
    top: '20px', // Adjust as needed
    right: '20px', // Adjust as needed
    width: '100px', // Adjust as needed
    height: 'auto', // Maintain aspect ratio
});

// Define styles for the sliding animation
const slideDownAnimation = `
  @keyframes slideDown {
    0% {
      transform: translateY(-100vh);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// Define styles for the InputBox
const InputBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '300px',
    animation: `slideDown 1s ease-out`,
    animationFillMode: 'forwards',
    '@keyframes slideDown': slideDownAnimation,
});


const CustomTextField = styled(TextField)({
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white',
    },
    '& .MuiFormHelperText-root': {
        color: 'orange', // Change this to your desired error color
    },
    '& .MuiInputLabel-root.Mui-error': {
        color: 'orange', // Change this to your desired error color
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'orange', // Change this to your desired error color
    },
});


const Login = () => {
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    const { host } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [formErrors, setFormErrors] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100); // Duration for the fade-in animation
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear validation error when user starts typing
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            email: '',
            password: '',
        };

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }
        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
            valid = false;
        }
        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;
            // Process login logic here
            axios.post(`${host}/api/user/user-login`, formData)
                .then((response) => {
                    if (response.data.success) {
                        localStorage.setItem("userToken", JSON.stringify(response.data.token));
                        toast.success(response?.data?.message);
                        // Reset form data after submission
                        setFormData({
                            
                            email: '',
                            password: '',
                        });
                        setTimeout(() => {
                            navigate("/");
                        }, 1000);
                    } else {
                        toast.error(response?.data?.message);
                    }
                })
                .catch((err) => {
                    console.log("Error : " + err);
                    toast.error('Something went wrong');
                });
    };
    return (
        <GradientBox>
            <Logo alt="Logo" sx={{ borderRadius: "20px" }}>
                <Icon icon={"carbon:flight-international"} width="64" height="64" color="#ff69b4" />
            </Logo>

            <Fade in={loaded} timeout={1000}>
                <Box component="div" sx={{ textAlign: 'left', margin: '20px', color: 'white' }}>
                    <Typography variant="h3" gutterBottom>
                    Login for Touristo
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Manage your travel bookings, view reports, and configure settings all from one place. Your gateway to overseeing all travel-related activities efficiently and effortlessly.
                    </Typography>
                </Box>
            </Fade>

            <Fade in={loaded} timeout={1000}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography sx={{ color: "white", textAlign: 'center', animation: `slideDown 1s ease-out`, animationFillMode: 'forwards' }} variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <InputBox>
                        <CustomTextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            helperText={formErrors.email}
                            error={!!formErrors.email}
                        />
                        <CustomTextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            fullWidth
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            helperText={formErrors.password}
                            error={!!formErrors.password}
                        />
                        <Button type="submit" variant="contained" style={{
                            backgroundColor: '#ff69b4'
                        }} fullWidth>
                            Submit
                        </Button>
                    </InputBox>
                    <Typography sx={{ color: "#ff69b4", textAlign: 'center', animation: `slideDown 1s ease-out`, animationFillMode: 'forwards',fontSize:'14px',my:1.2 }} variant="h6" gutterBottom>
                        Don't have an account ?  <Link to={'/register'}>Register</Link>
                    </Typography>
                </Box>
            </Fade>
        </GradientBox>
    );
};

export default Login;
