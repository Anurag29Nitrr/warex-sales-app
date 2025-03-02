const express = require('express');
const http = require('http');
const mongoose = require('./config/db');
const authRoutes = require('./routes/auth');
const skusRoutes = require('./routes/skus');
const customersRoutes = require('./routes/customers');
const ordersRoutes = require('./routes/orders');
const reportsRoutes = require('./routes/reports');
const jwt = require('jsonwebtoken');
const socket = require('./socket'); // Import socket.js

const app = express();
const server = http.createServer(app);
//const io = socket.init(server); // Initialize socket.io once
const io = socket.init(server, {
  cors: {
    origin: "*", // Allow all origins (for testing); 
    methods: ["GET", "POST"]
  }
});

app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/skus', skusRoutes);
app.use('/api/customers', customersRoutes);
app.use('/api/orders', ordersRoutes);
app.use('/api/reports', reportsRoutes);

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  try {
    const decoded = jwt.verify(token, 'your_jwt_secret');
    if (decoded.role === 'admin') {
      socket.user = decoded;
      next();
    } else {
      next(new Error('Not authorized'));
    }
  } catch (err) {
    next(new Error('Invalid token'));
  }
});

io.on('connection', (socket) => {
  console.log('Admin connected');
});

server.listen(3000, () => console.log('Server running on port 3000'));

module.exports = { app, server };  
