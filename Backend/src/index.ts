import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './database/db';
import router from './routes/routesIndex';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;



app.use( cors ({ origin: "*" }));

app.use(express.json());

app.use('/api', router);

app.get("/", (req, res) => {
  res.json({ message: "Server is upp and running!"})
});

connectDB();

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});