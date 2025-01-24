const mongoose = require('mongoose');

// Define the Package schema
const packageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    days: {
        type: [String], // Assuming itineraries is an array of strings
        default: []
    },
    accommodation: {
        type: String, 
        required: true
    },
    transportation: {
        type: String, 
        required: true
    },
    meals: {
        type: String, 
        required: true
    },
    numberOfAdults: {
        type: Number,
        required: true,
        min: 0
    },
    numberOfChildren: {
        type: Number,
        required: true,
        min: 0
    },
    familyPackage: {
        type: String,
        required: true
    },
    totalMembersPerFamily: {
        type: Number,
        required: false, // This is optional
        min: 0
    },
    specialRequests: {
        type: String,
        required: true
    },
    guideName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String, // Changed from Number to String for phone number
        required: true,
    },
    thumbnail: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default:'active'
    }
});

// Create the Package model
const Package = mongoose.model('Package', packageSchema);

// Export the model
module.exports = Package;
