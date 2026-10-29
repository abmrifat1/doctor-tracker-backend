const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
// const doctorRoutes = require('./routes/doctorRoutes');
// const patientRoutes = require('./routes/patientRoutes');
// const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN, 'http://localhost:3000'].filter(Boolean),
    credentials: true,
  })
);
app.use(express.json());

// Health check
app.get('/', (req, res) =>
  res.json({ success: true, message: 'Doctor Tracker API is running' })
);

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/patients', patientRoutes);
// app.use('/api/dashboard', dashboardRoutes);

// 404
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

// Error handler last
app.use(errorHandler);

module.exports = app;