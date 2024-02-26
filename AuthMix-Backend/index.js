import express from "express";
import LoginRoute from './routes/auth.js';
import dataRouter from "./routes/dataRoutes.js";
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors({origin:"http://localhost:5173",credentials: true,})); // for cookies creds need to be added

app.use('/user',LoginRoute)

app.use('/data',dataRouter)

app.listen(4000, () => {
  console.log("server running");
});
