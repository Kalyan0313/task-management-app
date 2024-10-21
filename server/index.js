import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from "./config/db.js"
import authRouter from './routes/authRoutes.js';
import taskRouter from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
