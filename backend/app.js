import './config/env.js'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import bannerRouter from "./routes/banner.routes.js";

import { rateLimit } from 'express-rate-limit'

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 30, // 30 request
  standardHeaders: 'draft-8', 
  legacyHeaders: false, 
  ipv6Subnet: 56,
})

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true
}));

//app.use(limiter)
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/banner', bannerRouter);

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Api is running in port ${port}`);
})

export default app;