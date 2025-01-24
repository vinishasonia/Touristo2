import React, { useContext } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

// Context import
import { AuthContext } from '../../../GlobalContext';

// Styled Components
const OverviewCard = styled(Paper)(({ theme, color }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light glass effect
  backdropFilter: 'blur(10px)', // Frosted glass effect
  borderRadius: '8px',
  height: '100%',
  border: `1px solid ${color}`, // Border color
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[6],
  },
}));
const ActivitySection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: theme.shadows[3],
}));

const Header = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  color: theme.palette.text.primary,
}));

const Content = styled(Typography)(({ theme }) => ({
  fontWeight: 'normal',
  color: theme.palette.text.secondary,
}));



const Dashboard = () => {
  const { alluser, allreq, feedback } = useContext(AuthContext);

  // Calculate data
  const totalUsers = alluser?.length || 0;
  const activeBookings = allreq?.filter(request => request.status === 'Accepted').length || 0;
  const pendingRequests = allreq?.filter(request => request.status === 'Pending').length || 0;

  // Extract recent activities
  const recentUser = alluser?.slice(-1)[0] || {};
  const recentFeedback = feedback?.slice(-1)[0] || {};
  const recentBooking = allreq?.filter(req => req.status === 'Accepted').slice(-1)[0] || {};

  return (
    <Box p={3}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Dashboard Overview
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Welcome to your dashboard! Here you can find an overview of key metrics and recent activities.
      </Typography>
      
      <Grid container spacing={3} sx={{ mb: 7 }}>
      <Grid item xs={12} sm={6} md={4}>
        <OverviewCard elevation={3} color="#4CAF50">
          <AccountCircleIcon style={{ fontSize: 40 }} />
          <Typography variant="h6">Total Users</Typography>
          <Typography variant="h4">{totalUsers}</Typography>
        </OverviewCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <OverviewCard elevation={3} color="#2196F3">
          <EventAvailableIcon style={{ fontSize: 40 }} />
          <Typography variant="h6">Active Bookings</Typography>
          <Typography variant="h4">{activeBookings}</Typography>
        </OverviewCard>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <OverviewCard elevation={3} color="#FF5722">
          <HourglassEmptyIcon style={{ fontSize: 40 }} />
          <Typography variant="h6">Pending Requests</Typography>
          <Typography variant="h4">{pendingRequests}</Typography>
        </OverviewCard>
      </Grid>
    </Grid>

      {/* Recent User Registration */}
      <ActivitySection>
        <Header variant="h5">
          Latest User Registration
        </Header>
        {recentUser._id ? (
          <Content variant="body1">
            <strong>Email:</strong> {recentUser.email} <br />
            <strong>Phone:</strong> {recentUser.phone} <br />
            <strong>Address:</strong> {recentUser.address}
          </Content>
        ) : (
          <Content variant="body1">No recent user registration.</Content>
        )}
      </ActivitySection>

      {/* Recent Feedback */}
      <ActivitySection>
        <Header variant="h5">
          Latest Feedback
        </Header>
        {recentFeedback._id ? (
          <Content variant="body1">
            <strong>Message:</strong> {recentFeedback.message} <br />
            <strong>Created At:</strong> {new Date(recentFeedback.createdAt).toLocaleString()}
          </Content>
        ) : (
          <Content variant="body1">No recent feedback.</Content>
        )}
      </ActivitySection>

      {/* Recent Booking */}
      <ActivitySection>
        <Header variant="h5">
          Latest Booking
        </Header>
        {recentBooking._id ? (
          <Content variant="body1">
            <strong>Package:</strong> {recentBooking.packageId?.name} <br />
            <strong>Status:</strong> {recentBooking.status} <br />
            <strong>Created At:</strong> {new Date(recentBooking.createdAt).toLocaleString()}
          </Content>
        ) : (
          <Content variant="body1">No recent bookings.</Content>
        )}
      </ActivitySection>
    </Box>
  );
};

export default Dashboard;
