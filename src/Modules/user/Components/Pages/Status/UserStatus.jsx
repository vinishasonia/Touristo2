import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AuthContext } from '../../../../GlobalContext';
import moment from 'moment';

export default function UserStatus() {
  const { singleusereq, imagePath } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleViewClick = (request) => {
    let id = request?.packageId?._id;
    let status = request?.status;
    let requestId = request?._id;
    let transactionId = request?.transactionId;
    navigate(`/package-detail/${id}`, { state: { status: status ,requestId:requestId,transactionId} });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "white";
    }
  };

  return (
    <Box sx={{ paddingX: 10, my: 5, mb: 25 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Travel Request Details
      </Typography>
      <Typography variant="body1" gutterBottom>
        Here you can view the details of your travel requests and check their status.
      </Typography>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'pink' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 700 }}>S.No</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Name</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Package Image</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Destination</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Requested</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {singleusereq?.length==0&&(
              <TableRow>
                <TableCell colSpan={6} sx={{fontWeight:500}} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
            {singleusereq?.map((request,index) => (
              <TableRow key={request._id}>
                <TableCell align="center" sx={{ fontWeight: 500 }}>{index+1}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>{request?.packageId?.name}</TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  <img
                    src={`${imagePath}/${request?.packageId?.thumbnail}`}
                    alt={request?.packageId?.name}
                    style={{ width: '100px', height: 'auto' }}
                  />
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>{request?.packageId?.destination}</TableCell>
                <TableCell align="center" sx={{ color: getStatusColor(request?.status), fontWeight: 'bold' }}>
                  {request?.status}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  {moment(request?.createdAt).format('MMM D, YYYY')} {/* Format the date as Sep 12, 2024 */}
                </TableCell>
                <TableCell align="center" sx={{ fontWeight: 500 }}>
                  <IconButton color="primary" onClick={() => handleViewClick(request)}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
