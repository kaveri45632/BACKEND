const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://shreenidhiarkasali:shreenidhi852005@cluster0.g9fcozh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB Atlas connection error:', err));

// Routes
// const itemRoutes = require('./routes/items');
// const cartRoutes = require('./routes/carts');000
const LoginRoutes = require('./routes/Logins');
const ReviewRoutes = require('./routes/Reviews');

// app.use('/api/items', itemRoutes);
// app.use('/cart', cartRoutes);
app.use('/Login',LoginRoutes);
app.use('/Review',ReviewRoutes);


// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
// MongoDB Atlas Connection