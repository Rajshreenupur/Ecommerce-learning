
import express, { Application, Request, Response } from 'express';
import adminRoutes from './routes/adminRoute';
import productRoutes from './routes/productRoute';
const cors = require('cors');

import path from 'path';



const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(cors());
app.use(express.static(path.join(__dirname, 'uploads')));
console.log(__dirname)
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
// Use admin routes
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);


// Routes
app.get('/items', (req: Request, res: Response) => {
  res.json({ message: 'Get all items' });
});

export default app;
