import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db';
import router from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



app.use( cors ({ origin: "http://localhost:5173"})
);

app.use( express.json());

app.use('/api', router);

connectDB();

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});