const mongoose = require('mongoose');
const Request = require('../../Model/Request'); // Adjust the path as needed

// Insert a new request
const RequestInsert = async (req, res) => {
    try {
        const { name, email, phone, address, packageId, userId } = req.body;

        // Check if a request with the same email and phone number already exists
        const existingRequest = await Request.findOne({ email, phone, packageId, userId });
        if (existingRequest) {
            return res.json({ success: false, message: 'Request with these details already exists' });
        }

        const newRequest = new Request({
            name,
            email,
            phone,
            address,
            packageId,
            userId
        });

        await newRequest.save();
        return res.json({ success: true, message: 'Request submited successfully!' });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: 'Internal Server Error' });
    }
};

// Get all requests
const GetRequests = async (req, res) => {
    try {
        const requests = await Request.find().populate('packageId').populate('userId');
        return res.json({ success: true, requests });
    } catch (error) {
        console.error(error.message);
        return res.json({ success: false, message: 'Something went wrong' });
    }
};

// Controller function to get requests by user ID
const GetRequestsByUserId = async (req, res) => {
    try { 
        const userId = req.user;
        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }
        const requests = await Request.find({ userId }).populate('packageId'); // Find requests by userId and populate packageId
        return res.json({ success: true, requests: requests });
    } catch (error) {
        console.error('Error fetching user requests:', error.message);
        return res.status(500).json({ success: false, message: 'Something went wrong' });
    }
};


// Get a single request by ID
const GetSingleRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id).populate('packageId').populate('userId');
        if (!request) {
            return res.status(404).send('Request not found');
        }
        return res.json({ success: true, request });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
};

// Delete a request by ID
const DeleteRequest = async (req, res) => {
    try {
        const request = await Request.findById(req.params.id);
        if (!request) {
            return res.status(404).send('Request not found');
        }
        await Request.findByIdAndDelete(req.params.id);
        return res.json({ success: true, message: 'Request deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Internal Server Error');
    }
};


// Update a request by ID
const UpdateRequest = async (req, res) => {
    try {
        let requestId=req.params.id;
        const {status,transactionId } = req.body;
        // Find the request by ID and update its status
        const updatedRequest = await Request.findByIdAndUpdate(
            requestId,
            { status,transactionId },
            { new: true } // Return the updated document
        );

        if (!updatedRequest) {
            return res.status(404).send({ status: false, message: 'Request not found' });
        }
        res.status(200).send({ status: true, message: 'Request status updated successfully', updatedRequest });

    } catch (error) {
        console.error('Error updating request status:', error.message);
        res.status(500).send({ status: false, message: 'Internal server error', message: 'Something went wrong!' });
    }
};

module.exports = {
    RequestInsert,
    GetRequests,
    GetSingleRequest,
    DeleteRequest,
    UpdateRequest,
    GetRequestsByUserId
};
