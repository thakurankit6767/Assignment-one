const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const policyRoutes = require('./routes/policyRoutes');
const illustrationRoutes = require('./routes/illustrationRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/policies', policyRoutes);
app.use('/api/illustrations', illustrationRoutes);

// Error Handler (must be last middleware)
app.use(errorHandler);  // ← Make sure errorHandler is a function

module.exports = app;