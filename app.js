import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import path from 'path';
import bodyParser from "body-parser"
import cors from 'cors';
dotenv.config();
const app = express();

app.use(bodyParser.json());
// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));
// Routes

app.use('/api/auth', authRoutes);
app.use('/api/profile', authRoutes);

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')));


export default app;