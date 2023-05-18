import express from 'express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import authRoute from './routes/auth.js';
import hotelsRoute from './routes/hotels.js';
import roomsRoute from './routes/rooms.js';
import usersRoute from './routes/users.js';

dotenv.config();
const app = express();

const connect = async () => {
  try {
    console.log('Connecting');
    await mongoose.connect(process.env.MONGO);
    console.log('Connected to MongoDB succesfully');
  } catch (error) {
    console.log('Error when connecting:', error);
  }
};

// configurations
app.use(express.json());

// middleware handle routes
app.use('/api/auth', authRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/users', usersRoute);

app.listen(8080, () => {
  connect();
});
