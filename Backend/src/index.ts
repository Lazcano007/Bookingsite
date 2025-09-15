import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();


app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


app.listen(PORT, async () => {
  //   await connectDB();
  console.log(`Server is running at http://localhost:${PORT}`);
});