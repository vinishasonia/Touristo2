// const express = require('express');
// const cors = require('cors');
// const dbConnection = require('./db');

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// dbConnection();

// // Adjust route path based on your project structure:

// app.use('/api/package', require('./Routes/PackageRoutes'))
// app.use('/upload/package', express.static('./upload'));

// app.use('/api/images', require('./Routes/ImageRoutes'));

// app.use('/upload/images', express.static('./upload'));

// app.use("/api/user", require('./Routes/userRoute'));

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Server is listening on port: ${PORT}`);
// });

const express = require('express');
const dbConnection= require('./db');
const cors = require('cors');
const app = express();
app.use(express.json());    
app.use(cors());
dbConnection();
const PORT = 8000;
app.use('/api/admin',require('./Routes/adminRoutes'));
app.use('/api/user',require('./Routes/userRoutes'));
app.use('/api/package', require('./Routes/PackageRoutes'))
app.use('/upload/images', express.static('./upload'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
