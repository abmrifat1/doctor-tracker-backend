const express = require('express');
const cors = require('cors');

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

// 404
app.use((req, res) =>
  res.status(404).json({ success: false, message: 'Route not found' })
);

module.exports = app;