import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Rating, Paper } from '@mui/material';
import axios from 'axios';
import config from '../../../../../src/config';

const ManageFeedback = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
  const { host } = config;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedbackData = {
      firstName,
      lastName,
      feedback,
      rating,
    };
    try {
      const response = await axios.post(`${host}/api/package/feedback`, feedbackData);
      console.log('Feedback Submitted:', response.data);
      // Clear the form
      setFirstName('');
      setLastName('');
      setFeedback('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5, backgroundColor: '#f5f5f5',marginBottom:'10px' }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: '#3f51b5' }}>
        Testimonial
        </Typography>
        <TextField
          fullWidth
          label="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          fullWidth
          label="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <TextField
          fullWidth
          label="Feedback"
          multiline
          rows={4}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ backgroundColor: '#fff', borderRadius: 1 }}
        />
        <Box sx={{ mt: 2 }}>
          <Typography component="legend" sx={{ color: '#3f51b5' }}>Rating</Typography>
          <Rating
            name="simple-controlled"
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
        >
          Submit Feedback
        </Button>
      </Box>
    </Paper>
  );
};

export default ManageFeedback;
