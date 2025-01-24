import React, { useContext, useEffect, useState } from 'react';
import { Box, TextField, Button, Typography, Fade } from '@mui/material';
import { styled } from '@mui/system';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import bg from '../Auth/bg_1.jpg';
import { Icon } from '@iconify/react';
import { AuthContext } from '../../../GlobalContext';

// Define styles for the GradientBox
const GradientBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    position: 'relative',
    // overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `url(${bg}) no-repeat center center/cover`,
        filter: 'blur(2px)',
        zIndex: -1,
        backgroundSize: 'cover',
    },
});

// Define styles for the Logo
const Logo = styled("div")({
    position: 'absolute',
    top: '20px',
    right: '20px',
    width: '100px',
    height: 'auto',
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
        color: 'orange',
    },
    '& .MuiInputLabel-root.Mui-error': {
        color: 'orange',
    },
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: 'orange',
    },
});

const Register = () => {
    const [loaded, setLoaded] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        phone: '',
        address: '',
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        username: '',
        password: '',
        phone: '',
        address: '',
    });
    const navigate = useNavigate();
    const { host } = useContext(AuthContext);

    useEffect(() => {
        const timer = setTimeout(() => setLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        setFormErrors({
            ...formErrors,
            [name]: '',
        });
    };

    const validateForm = () => {
        let valid = true;
        const errors = {
            email: '',
            username: '',
            password: '',
            phone: '',
            address: '',
        };

        // Email validation
        if (!formData.email) {
            errors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Email is invalid';
            valid = false;
        }
        // Username validation
        if (!formData.username) {
            errors.username = 'Username is required';
            valid = false;
        }
        // Password validation
        if (!formData.password) {
            errors.password = 'Password is required';
            valid = false;
        } else if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters long';
            valid = false;
        }
        // Phone validation
        if (!formData.phone) {
            errors.phone = 'Phone number is required';
            valid = false;
        } else if (!/^\d{10}$/.test(formData.phone)) {
            errors.phone = 'Phone number must be 10 digits';
            valid = false;
        }
        // Address validation
        if (!formData.address) {
            errors.address = 'Address is required';
            valid = false;
        }

        setFormErrors(errors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

            axios.post(`${host}/api/user/user-register`, formData)
                .then((response) => {
                    console.log(response.data);
                    if (response.data.status) {
                        toast.success(response?.data?.message);
                        setFormData({
                            email: '',
                            username: '',
                            password: '',
                            phone: '',
                            address: '',
                        });
                        setTimeout(() => {
                            navigate("/login");
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
                        Register for Touristo
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Create an account to manage your travel bookings and settings. Fill in the details below to get started.
                    </Typography>
                </Box>
            </Fade>

            <Fade in={loaded} timeout={1000}>
                <Box component="form" onSubmit={handleSubmit}>
                    <Typography sx={{ color: "white", textAlign: 'center', animation: `slideDown 1s ease-out`, animationFillMode: 'forwards' }} variant="h4" gutterBottom>
                        Register
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
                            label="Username"
                            variant="outlined"
                            fullWidth
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            helperText={formErrors.username}
                            error={!!formErrors.username}
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
                        <CustomTextField
                            label="Phone"
                            variant="outlined"
                            fullWidth
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            helperText={formErrors.phone}
                            error={!!formErrors.phone}
                        />
                        <CustomTextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            helperText={formErrors.address}
                            error={!!formErrors.address}
                        />
                        <Button type="submit" variant="contained" style={{ backgroundColor: '#ff69b4' }} fullWidth>
                            Register
                        </Button>
                    </InputBox>

                    <Typography sx={{ color: "#ff69b4", textAlign: 'center', animation: `slideDown 1s ease-out`, animationFillMode: 'forwards',fontSize:'14px',my:1.2 }} variant="h6" gutterBottom>
                        Already have an account ?  <Link to={'/login'}>Login</Link>
                    </Typography>
                </Box>
            </Fade>
        </GradientBox>
    );
};

export default Register;
