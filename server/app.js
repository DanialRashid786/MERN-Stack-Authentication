// server.js or main entry point
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const connectDB = require('./connection'); // Import the db connection file
const AuthRoutes = require('./routes/Auth_Routes/AuthRoutes').router;
const ProductRoutes = require('./routes/Product_Routes/ProductsRoutes').router;
const cors = require('cors');

dotenv.config();



const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to the database
connectDB(); // Call the database connection function

// Use Routes
app.use('/auth', AuthRoutes);
app.use('/projects', ProductRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
