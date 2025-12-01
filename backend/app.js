import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from './config/env.js';

import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import bannerRouter from "./routes/bannerRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/banner', bannerRouter);

app.listen(2000, () => {

  console.log(`Api is running in port 2000`);
})

export default app;