const express = require('express');
const { AdminLogin } = require('../Controller/Admin/Login');

const { GalleryInsert, GetGallery, DeleteGallery, GetSingleGallery, UpdateGallery, } = require('../Controller/Admin/GalleryController');
const { RequestInsert, GetRequests, GetSingleRequest, DeleteRequest, UpdateRequest, GetRequestsByUserId } = require('../Controller/Admin/RequestController');

const upload = require('../Middleware/upload'); // Adjust the path as necessary
const router = express.Router();
const middleware = require('../Middleware/middleware'); // Adjust the path as necessary
const { InsertFeedback, GetAllFeedback, DeleteFeedback } = require('../Controller/Admin/FeedbackController');
// Admin Logins
router.post('/login', AdminLogin);
// Gallery 
router.post('/addgallery', upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), GalleryInsert); // Handle single file upload with field name 'thumbnail'
router.get('/getgallery', GetGallery);
router.get('/singlegallery/:id', GetSingleGallery);
router.delete('/deletegallery/:id', DeleteGallery);
router.put('/updategallery/:id',upload.fields([{ name: 'thumbnail', maxCount: 1 }, { name: 'video', maxCount: 1 }]), UpdateGallery);



// Insert a new request
router.post('/addrequest', RequestInsert);
router.get('/getrequests', GetRequests);
router.get('/singlerequest/:id', GetSingleRequest);
router.delete('/deleterequest/:id', DeleteRequest);
router.put('/updaterequest/:id', UpdateRequest);
router.get('/getrequestsbyuserId',middleware, GetRequestsByUserId);

// Feedback
router.post('/addfeedback', InsertFeedback);
router.get('/getfeedback', GetAllFeedback);
router.delete('/deletefeedback/:id', DeleteFeedback);

module.exports = router;

