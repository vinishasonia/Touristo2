const express=require('express');
const { UserRegister, UserLogin, GetOneUser, GetUser } = require('../Controller/User/RegisterLogin');
const router=express.Router();
const middleware = require('../Middleware/middleware'); // Adjust the path as necessary
// const { addRequest, getRequests, getRequestsByUserId } = require('../Controller/User/Request');

//user regiger/Login
router.post('/user-register', UserRegister);
router.post('/user-login', UserLogin);
router.get('/get-single-user',middleware,GetOneUser);
router.get('/get-user',GetUser);

// // Request
// router.post('/addRequest', addRequest);
// router.get('/getRequests', getRequests);
// router.get('/getRequestsByUserId',middleware, getRequestsByUserId);

module.exports=router;

