import React, { useContext, useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../../../../GlobalContext';
import { useNavigate } from 'react-router-dom';


const RequestFormModal = ({ onClose, packageId }) => {
    const { host, user,setreqCount } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
    });

    const [errors, setErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        if (!formData.phone) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            newErrors.phone = 'Phone number must be exactly 10 digits';
        }
        if (!formData.address) newErrors.address = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        const userId = user?._id;
        const ReuestData = {
            ...formData,
            userId,       // Add userId to the payload
            packageId     // Add packageId to the payload
        };
        axios.post(`${host}/api/admin/addrequest`, ReuestData)
            .then((response) => {
                if (response.data.success) {
                    setreqCount((prev)=>prev+1)
                    // onClose(); // Close the form on successful submission
                    navigate('/packages')
                    toast.success(response?.data?.message);
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
        <Box sx={{ padding: 4, backgroundColor: '#fff', boxShadow: 3, borderRadius: 2 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{ fontWeight: 500 }}
            >
                Make a Request!
            </Typography>
            <Typography
                variant="body1"
                paragraph
                sx={{ fontWeight: 400 }}
            >
                We are excited to help you with your request! Please fill out the form below with your details, and we will get back to you as soon as possible.
            </Typography>
            <Typography
                variant="body2"
                paragraph
                sx={{ fontWeight: 400 }}
            >
                <strong>Instructions:</strong>
                <ul>
                    <li>Please provide your full name, email, and phone number so we can contact you.</li>
                    <li>Enter your address where applicable, and let us know if there are any special instructions or requirements.</li>
                    <li>Double-check all information before submitting to ensure accuracy.</li>
                </ul>
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    label="Name"
                    fullWidth
                    margin="normal"
                    error={!!errors.name}
                    helperText={errors.name}
                />
                <TextField
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    label="Email"
                    fullWidth
                    margin="normal"
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    label="Phone"
                    fullWidth
                    margin="normal"
                    error={!!errors.phone}
                    helperText={errors.phone}
                />
                <TextField
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    label="Address"
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    error={!!errors.address}
                    helperText={errors.address}
                />

                <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Submit
                </Button>
                <Button variant="outlined" color="secondary" sx={{ mt: 2, ml: 2 }} onClick={onClose}>
                    Cancel
                </Button>
            </form>
        </Box>
    );
};

export default RequestFormModal;
