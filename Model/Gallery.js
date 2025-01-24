const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type:Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    video: {
        type: String, // Store the filename of the video
        required: true
    }
}, {
    timestamps: true
});

const ImageModel = mongoose.model('Images', ImageSchema);

module.exports = ImageModel;
