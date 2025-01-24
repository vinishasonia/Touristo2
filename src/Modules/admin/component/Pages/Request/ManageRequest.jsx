import React, { useContext, useState, useEffect } from 'react';
import { Paper, Typography, Grid, Button, Box, Tabs, Tab } from '@mui/material';
import { AuthContext } from '../../../../GlobalContext';
import axios from 'axios';

import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';

const ManageRequest = () => {
  const { allreq, setreqCount, host } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('Pending');

  useEffect(() => {
    if (allreq) {
      setRequests(allreq);
    }
  }, [allreq]);

  const handleApproveRequest = async (id) => {
    try {
      const Data = {
        status: "Accepted"
      };
      axios.put(`${host}/api/admin/updaterequest/${id}`, Data)
        .then((res) => {
          if (res.data.status) {
            setreqCount((prev) => prev + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error('Error approving request:', error);
    }
  };

  const handleRejectRequest = async (id) => {
    try {
      const Data = {
        status: "Rejected"
      };
      axios.put(`${host}/api/admin/updaterequest/${id}`, Data)
        .then((res) => {
          if (res.data.status) {
            setreqCount((prev) => prev + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };

  const renderActionButtons = (request) => (
    <Box display="flex" gap={1}>
      {!request.transactionId && (
        <>
          {request.status !== 'Accepted' && (
            <Button
              variant="contained"
              color="success"
              onClick={() => handleApproveRequest(request._id)}
            >
              Approve
            </Button>
          )}
          {request.status !== 'Rejected' && (
            <Button
              variant="contained"
              color="error"
              onClick={() => handleRejectRequest(request._id)}
            >
              Reject
            </Button>
          )}
        </>
      )}
    </Box>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'orange';
    }
  };

  const filteredRequests = requests.filter((request) => {
    if (filter === 'All') return true;
    return request.status === filter;
  });

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Manage Requests
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Review and manage all incoming requests here. You can delete requests as needed and keep track of the overall request status.
      </Typography>
      <Tabs
        value={filter}
        onChange={(e, newValue) => setFilter(newValue)}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="Pending" value="Pending" />
        <Tab label="Accepted" value="Accepted" />
        <Tab label="Rejected" value="Rejected" />
      </Tabs>

      {filteredRequests?.length > 0 ? (
        filteredRequests?.map((request) => (
          <Paper
            key={request._id}
            style={{ padding: '20px', marginTop: '20px', borderRadius: '8px' }}
            elevation={3}
          >
            <Grid container spacing={2}>
              <Grid item xs={8}>
              <Typography variant="body1" style={{ color: getStatusColor(request.status),fontWeight:900 }}>
                  Status: {request?.status}
                </Typography>

                <Typography variant="h6" color="primary">
                  {request?.name}
                </Typography>
                <Box display="flex" alignItems="center" mb={0.8} gap={1}>
                  <EmailIcon />
                  <Typography variant="body1">{request.email}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={0.8} gap={1}>
                  <PhoneIcon />
                  <Typography variant="body1">{request.phone}</Typography>
                </Box>
                <Box display="flex" alignItems="center" mb={0.8} gap={1}>
                  <HomeIcon />
                  <Typography variant="body1">{request.address}</Typography>
                </Box>
               
                <Box>
                  <Typography variant="body1">
                    Package Detail
                  </Typography>
                  <Typography variant="body1">
                    {request?.packageId?.name}
                  </Typography>
                  <Typography variant="body1">
                    Guide: {request?.packageId?.guideName}
                  </Typography>
                  <Typography variant="h5">
                    Price: {request?.packageId?.price}
                  </Typography>
                </Box>
              </Grid>
              <Grid
                item xs={4}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                {!request.transactionId ? (
                  renderActionButtons(request)
                ) : (
                  <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Typography variant="h5" style={{ color: 'green', fontWeight: 'bold' }}>
                      User has paid the amount
                    </Typography>
                    <Typography  style={{ marginTop: '10px', color: 'grey' }}>
                      {`Transaction ID: ${request.transactionId}`}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Paper>
        ))
      ) : (
        <Typography variant="h6" color="textSecondary" align="center" style={{ marginTop: '20px' }}>
          No data available
        </Typography>
      )}
    </div>
  );
};

export default ManageRequest;
