import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CardMedia,
  Collapse,
  Divider,
  Button,
  Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import { AuthContext } from '../../../../GlobalContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const ManagePackageList = () => {
  const navigate = useNavigate();
  const { host, imagePath, packageList, setPackageCount } = useContext(AuthContext);
  const [expanded, setExpanded] = useState(null);
  const handleExpandClick = (packageId) => {
    setExpanded(expanded === packageId ? null : packageId);
  };

  const handleEdit = (packageId) => {
    navigate(`/admin/manage-update/${packageId}`);
  };

  const handleDelete = async (packageId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this package',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#635bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${host}/api/package/deletePackage/${packageId}`)
          .then((res) => {
            if (res?.data.status) {
              toast?.success(res?.data?.message)
              setPackageCount((prev) => prev + 1);
            } else {
              toast?.error(res?.data?.message)
            }
          })
          .catch((error) => {
            console.error('Error deleting package:', error);
          });
      }
    });
  };

  const getTotalMembers = (adults, children, familyMembers) => {
    return (
      parseInt(adults, 10) +
      parseInt(children, 10) +
      (familyMembers ? parseInt(familyMembers, 10) : 0)
    );
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Manage Packages List
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Here you can view, edit, and delete packages from your list. Click on the respective buttons to manage each package.
      </Typography>
      <Grid container spacing={3}>

        {packageList?.length === 0 && (
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No packages are available
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/manage-packages')}>
              Add Package
            </Button>
          </Grid>
        )}


        {packageList?.map((packageItem) => (
          <Grid item xs={12} sm={6} md={4} key={packageItem._id}>
            <Card elevation={0} style={{
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <Box sx={{ position: 'absolute', backgroundColor: packageItem?.status == "expired" ? 'red' : 'green' ,borderTopLeftRadius:5,borderBottomRightRadius:15,border:'1px solid white'}}>
                <Typography sx={{ padding: 1, color: 'white' }}>
                  {packageItem?.status == "expired" ? 'Expired' : 'Active' }
                </Typography>
              </Box>
              {packageItem._id && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`${imagePath}/${packageItem?.thumbnail}`}
                  alt={packageItem?.name}
                  style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  {packageItem.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {packageItem.description}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 600 }}>Price: </Typography>
                  {packageItem.price}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 600 }}>Total Members for the Trip: </Typography>
                  {getTotalMembers(
                    packageItem.numberOfAdults,
                    packageItem.numberOfChildren,
                    packageItem.totalMembersPerFamily
                  )}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 600 }}>Start Date: </Typography>
                  {moment(packageItem.startDate).format('MMMM Do YYYY')}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 600 }}>End Date: </Typography>
                  {moment(packageItem.endDate).format('MMMM Do YYYY')}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="edit" onClick={() => handleEdit(packageItem._id)}>
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(packageItem._id)}>
                  <DeleteIcon color='error' />
                </IconButton>
                <ExpandMore
                  expand={expanded === packageItem._id}
                  onClick={() => handleExpandClick(packageItem._id)}
                  aria-expanded={expanded === packageItem._id}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>

              <Collapse in={expanded === packageItem._id} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="div" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ fontWeight: 600 }}>Itinerary:</Typography>
                    <ul style={{ paddingLeft: '20px' }}>
                      {typeof packageItem.days === 'string' &&
                        packageItem.days.split(',').map((item, index) => (
                          <li key={index} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                            Day {index + 1}: {item}
                          </li>
                        ))}
                      {Array.isArray(packageItem?.days) &&
                        packageItem?.days?.map((item, index) => (
                          <li key={index} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                            Day {index + 1}: {item}
                          </li>
                        ))}
                    </ul>
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Meal: </Typography>
                    {packageItem.meals}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Accommodation: </Typography>
                    {packageItem.accommodation}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Transport: </Typography>
                    {packageItem.transportation}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Adults: </Typography>
                    {packageItem.numberOfAdults}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Children: </Typography>
                    {packageItem.numberOfChildren}
                  </Typography>
                  {packageItem.familyPackage === 'Yes' && (
                    <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Total Family Members: </Typography>
                      {packageItem.totalMembersPerFamily}
                    </Typography>
                  )}
                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Special Requests: </Typography>
                    {packageItem.specialRequests}
                  </Typography>

                  <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 500 }}>Email :</Typography>
                    {packageItem?.email}
                  </Typography>

                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ManagePackageList;
