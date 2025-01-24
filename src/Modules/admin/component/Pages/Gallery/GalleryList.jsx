import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid, Card, CardContent, CardActions, Typography, IconButton,
  CardMedia, Divider, Button, Dialog, DialogContent, DialogActions
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Icon } from '@iconify/react/dist/iconify.js';
import { AuthContext } from '../../../../GlobalContext';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';

const ManageGalleryList = () => {
  const navigate = useNavigate();
  const { host, galleryList, setGalleryCount, imagePath } = useContext(AuthContext);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleEdit = (galleryId) => {
    navigate(`/admin/edit-gallery/${galleryId}`);
  };

  const handleDelete = async (galleryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this gallery',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#635bff',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${host}/api/admin/deletegallery/${galleryId}`)
          .then((res) => {
            if (res?.data.status) {
              toast?.success(res?.data?.message);
              setGalleryCount((prev) =>prev+1);
            } else {
              toast?.error(res?.data?.message);
            }
          })
          .catch((error) => {
            console.error('Error deleting gallery:', error);
          });
      }
    });
  };

  const handlePlayVideo = (videoPath) => {
    setSelectedVideo(`${imagePath}/${videoPath}`);
    setVideoDialogOpen(true);
  };

  const handleCloseVideoDialog = () => {
    setVideoDialogOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div>
    <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Manage Gallery List
      </Typography>

      <Typography variant="h6" sx={{ mb: 4, color: 'text.primary' }}>
        Here you can view, manage, and delete items from your gallery. Click on the view button to see the full image.
      </Typography>

      <Grid container spacing={3}>
        {galleryList?.length === 0 && (
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              No galleries are available
            </Typography>
            <Button variant="contained" color="primary" onClick={() => navigate('/admin/add-gallery')}>
              Add Gallery
            </Button>
          </Grid>
        )}
        {galleryList?.map((galleryItem) => (
          <Grid item xs={12} sm={6} md={4} key={galleryItem._id}>
            <Card elevation={0} style={{
              borderRadius: '15px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              {galleryItem.thumbnail && (
                <CardMedia
                  component="img"
                  height="200"
                  image={`${imagePath}/${galleryItem.thumbnail}`}
                  alt={galleryItem.thumbnail}
                  style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  {galleryItem.title}
                </Typography>
                <Typography textOverflow={"ellipsis"} variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif',textOverflow:'ellipsis',overflow:'hidden' }}>
                  {galleryItem.description}
                </Typography>
                <Divider style={{ margin: '10px 0' }} />
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 600 }}>Location: </Typography>
                  {galleryItem.location}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <Typography variant="subtitle2" style={{ display: 'inline', fontWeight: 600 }}>Created: </Typography>
                  {moment(galleryItem.createdAt).format('MMMM Do YYYY')}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="edit" onClick={() => handleEdit(galleryItem._id)}>
                  <EditIcon color="secondary" />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleDelete(galleryItem._id)}>
                  <DeleteIcon color="error" />
                </IconButton>
                {galleryItem.video && (
                  <IconButton aria-label="play" onClick={() => handlePlayVideo(galleryItem.video)}>
                    <Icon icon="icon-park-solid:play" />
                  </IconButton>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Video Dialog */}
      <Dialog  open={videoDialogOpen} onClose={handleCloseVideoDialog} maxWidth="md" fullWidth>
        <DialogContent sx={{backgroundColor:'black'}}>
          {selectedVideo && (
            <video width="100%" controls autoPlay>
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </DialogContent>
        <DialogActions sx={{backgroundColor:' rgba(255, 105, 180, 0.65)'}}>
          <Button onClick={handleCloseVideoDialog} sx={{color:'black'}}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ManageGalleryList;
