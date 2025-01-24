const mongoose = require('mongoose');
// Define the Request Schema
const requestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
        type: String,
    },
    transactionId: {
        type: String,
    },
    
    
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package', // Reference to a Package model, assuming you have one
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to a User model, assuming you have one
        required: true
    },
    status: {
        type: String,
        default: 'Pending', // Set default value
    }
}, {
    timestamps: true  // This option adds `createdAt` and `updatedAt` fields
});

// Create a model from the schema
const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
