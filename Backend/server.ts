// src/server.ts

import app from './app';
import { connectDB } from './config/db';

const PORT: number = 5000;

// Connect to MongoDB
connectDB();

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
