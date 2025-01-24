import React, { useContext, useState } from 'react';
import { Box, Typography, Card, CardContent, Divider, IconButton, Tooltip } from '@mui/material';
import { AuthContext } from '../../../../GlobalContext'; // Adjust the import path as needed
import { toast } from 'react-toastify';
import axios from 'axios';
import { Delete as DeleteIcon } from '@mui/icons-material';

// Custom styles for the card and hover effect
const styles = {
  card: {
    transition: 'transform 0.3s ease',
    width: '300px', // Set fixed width
    height: '200px', // Set fixed height
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '15px',
    position: 'relative', // Needed for the delete button positioning
    '&:hover': {
      transform: 'scale(1.05)', // Slightly increase size on hover
      zIndex: 1, // Ensure card is on top of others
    },
  },
  cardContent: {
    textAlign: 'center', // Center-align text horizontally
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center-align text vertically
    alignItems: 'center',
    height: '100%',
    padding: '16px',
  },
  divider: {
    margin: '16px 0', // Add margin for better spacing
  },
  deleteButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    display: 'none', // Hide delete button by default
  },
  cardHovered: {
    '&:hover $deleteButton': {
      display: 'block', // Show delete button on hover
    },
  },
  noDataMessage: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: 'text.secondary',
  },
};

const AdminFeedback = () => {
  const { feedback, setFeedbackCount, host } = useContext(AuthContext);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${host}/api/admin/deletefeedback/${id}`);
      setFeedbackCount((prevCount) => prevCount - 1); // Adjust count if needed
      toast.success('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting feedback:', error);
      toast.error('Error deleting feedback');
    }
  };

  return (
    <Box sx={{ width: '100%', p: 4 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Travel Package User Feedback
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Here you can manage feedback from users regarding travel packages.
      </Typography>

      {/* Display a message if no feedback is available */}
      {feedback?.length === 0 ? (
        <Typography sx={styles.noDataMessage}>No feedback available at the moment.</Typography>
      ) : (
        // Display feedbacks in cards
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
          {feedback?.map((feedbackItem) => (
            <Card
              key={feedbackItem._id}
              sx={{ ...styles.card, ...(hoveredCard === feedbackItem._id && styles.cardHovered) }}
              elevation={3}
              onMouseEnter={() => setHoveredCard(feedbackItem._id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent sx={styles.cardContent}>
                <Typography variant="h6">{feedbackItem?.name}</Typography>
                <Typography variant="body2" color="text.secondary">{feedbackItem?.email}</Typography>
                <Divider sx={styles.divider} />
                <Typography variant="body1">
                  {feedbackItem?.message}
                </Typography>
                
                <IconButton
                    sx={styles.deleteButton}
                    color="error"
                    onClick={() => handleDelete(feedbackItem._id)}
                >
                  <DeleteIcon />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default AdminFeedback;
