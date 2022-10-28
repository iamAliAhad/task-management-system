import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import allRoutes from './routes/index.js';
// Imported all fuction 👆

const app = express();
const PORT = process.env.PORT || 8000;

// middleware
app.use(cors());
app.use(morgan('tiny')); // morgan will log all the request to the console
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api', allRoutes);

// error handler
// eslint-disable-next-line
// we are not using next parameter but still i need to use it otherwise it will give error! awkward moment :(
// eslint-disable-next-line
  app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(status).json({ message, stack: err.stack });
});

// Database Config to connect
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

// run the server and connect to database
app.listen(PORT, () => {
  connectDB(); // connect to database
  console.log(`Server is running on port ${PORT}`);
});
