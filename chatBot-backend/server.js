import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import qnaRouter from './src/router/chatRouter.js';
import multer from 'multer';
import path from 'path';
const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/chatbot');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use CORS middleware
app.use(cors());
app.use(express.static(path.join('public')));

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});
app.use('/qna', qnaRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
