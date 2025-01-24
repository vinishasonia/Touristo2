const mongoose = require('mongoose');
const URI = "mongodb://localhost:27017/Touristo";

const dbConnection = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error(err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = dbConnection;