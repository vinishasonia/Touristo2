import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Grid, Card, CardContent, CardMedia, Button } from '@mui/material';
import { AuthContext } from '../../../../GlobalContext';
import RequestFormModal from './RequestModal';
import Swal from 'sweetalert2';
import scanner from "./Scanner.png";


export default function SingleTravelDetail() {
  const { id } = useParams();
  const { state } = useLocation();
  let navigate = useNavigate()
  const FromPackageDetail = state?.fromPackage;
  const RequestStatus = state?.status;
  const requestId = state?.requestId;
  const transactionId = state?.transactionId;


  const { host, imagePath, setPackageCount,setreqCount } = useContext(AuthContext)
  const modalRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isModalOpen]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Use setTimeout to ensure the modal is rendered before scrolling
    setTimeout(() => {
      document.getElementById('request-form-modal')?.scrollIntoView({ behavior: 'smooth' });
    }, 0);
  };

  const handleDone = (transactionId) => {
    const Data = {
      transactionId // Include transactionId here
    };
    axios.put(`${host}/api/admin/updaterequest/${requestId}`, Data)
      .then((res) => {
        if (res.data.status) {
          console.log("Hello");
          setreqCount((prev)=>prev+1)
          navigate('/bookingstatus')
          setPackageCount((prev) => prev + 1)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePayment = () => {
    Swal.fire({
      title: 'Scan the QR Code',
      html: `
            <div style="display: flex; justify-content: center; align-items: center;">
                <img src="${scanner}" alt="QR Code" style="width:50%; height:50%; margin:auto;">
            </div>
            <input type="text" id="transactionId" class="swal2-input" placeholder="Enter Transaction ID">
        `,
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Proceed to QR Code',
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const transactionId = Swal.getPopup().querySelector('#transactionId').value;
        if (!transactionId) {
          Swal.showValidationMessage('Transaction ID is required');
          return false;
        } else if (transactionId.length < 6) {
          Swal.showValidationMessage('Transaction ID must be at least 6 characters long');
          return false;
        }
        return transactionId;
      }
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Payment Done', 'Your payment has been processed!', 'success');
        handleDone(result.value);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Try Next time', 'info');
      }
    });
  };


  const [travelDetail, setTravelDetail] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const response = await axios?.get(`${host}/api/package/getSinglePackage/${id}`);
        if (response?.data?.success) {
          setTravelDetail(response?.data?.package);
        } else {
          console.error('Failed to fetch package details');
        }
      } catch (error) {
        console.error('Error fetching package details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (!travelDetail) {
    return <Typography variant="h6" align="center">No details available.</Typography>;
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "orange";
      case "Accepted":
        return "green";
      case "Rejected":
        return "red";
      default:
        return "black";
    }
  };

  return (
    <>

      <Box sx={{ padding: 4 }}>
        {/* Header Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "flex-start" }}>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="h3" component="h1" gutterBottom>
              {travelDetail?.name || 'N/A'}
            </Typography>
            <Typography variant="h5" gutterBottom>
              {travelDetail?.destination || 'N/A'}
            </Typography>

            {!FromPackageDetail && (
              <>
                <Typography
                  variant="h6"
                  sx={{ color: getStatusColor(RequestStatus) }}
                >
                  Status: {RequestStatus || 'N/A'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Enjoy your trip with the details below. Be sure to check the status of your request.
                </Typography>

              </>
            )}
          </Box>

          <Grid item xs={12}>
  {travelDetail.status === "expired" ? (
    <Typography
      sx={{
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        fontWeight: 'bold',
      }}
    >
      Package has expired
    </Typography>
  ) : (
    <>
      {!RequestStatus && (
        <Button
          sx={{ border: '1px solid pink' }}
          onClick={handleOpenModal}
        >
          Make a Request
        </Button>
      )}

      {RequestStatus === "Accepted" && (
        <Button
          sx={{ border: transactionId ? '1px solid green' : '1px solid pink' }}
          onClick={transactionId ? () => {} : handlePayment}
        >
          {transactionId ? 'Paid Successfully' : 'Pay Now'}
        </Button>
      )}
    </>
  )}
</Grid>


        </Box>


        {/* Card for Travel Package Details */}
        <Card>
          <Grid container>
            {/* Image Section */}
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                height="400"
                image={`${imagePath}/${travelDetail?.thumbnail || 'https://via.placeholder.com/600x400'}`} // Assuming `thumbnail` contains the image URL
                alt={travelDetail?.name || 'No Image'}
              />
            </Grid>

            {/* Details Section */}
            <Grid item xs={12} md={6}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  {travelDetail?.description || 'N/A'}
                </Typography>
                <Typography variant="h6" component="h2" gutterBottom>
                  Price: ${travelDetail?.price || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Start Date: {new Date(travelDetail?.startDate).toLocaleDateString() || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  End Date: {new Date(travelDetail?.endDate).toLocaleDateString() || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Accommodation: {travelDetail?.accommodation || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Transportation: {travelDetail?.transportation || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Meals: {travelDetail?.meals || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Guide: {travelDetail?.guideName || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Destination: {travelDetail?.destination || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Number of Adults: {travelDetail?.numberOfAdults || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Number of Children: {travelDetail?.numberOfChildren || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Family Package: {travelDetail?.familyPackage || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Special Requests: {travelDetail?.specialRequests || 'N/A'}
                </Typography>
                <Typography variant="body1">
                  Contact: {travelDetail?.email || 'N/A'}, {travelDetail?.phoneNumber || 'N/A'}
                </Typography>
              </CardContent>
            </Grid>
          </Grid>

        </Card>

        {/* Itinerary Section */}
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Itinerary
          </Typography>
          <ul>
            {travelDetail?.days?.map((day, index) => (
              <li key={index}>
                <Typography variant="body1">{day}</Typography>
              </li>
            )) || 'N/A'}
          </ul>
        </Box>
      </Box>

      {/* Request Form Modal */}
      {isModalOpen && (
        <div id="request-form-modal">
          <RequestFormModal onClose={handleCloseModal} packageId={id} />
        </div>
      )}


    </>
  );
}
