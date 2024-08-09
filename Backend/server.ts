
import app from './app';
import { connectDB } from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT: any = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
