const express = require('express');
const cors = require('cors');
const projectRoutes = require('./routes/projectRoutes');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File upload endpoint
app.use('/api', projectRoutes);

module.exports = app;
