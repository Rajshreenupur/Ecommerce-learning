
import express, { Application, Request, Response } from 'express';
import adminRoutes from './routes/adminRoute';
import productRoutes from './routes/productRoute';


const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());


// Use admin routes
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);


// Routes
app.get('/items', (req: Request, res: Response) => {
  res.json({ message: 'Get all items' });
});

export default app;
