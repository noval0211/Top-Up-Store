import './config/env.js'
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from 'compression'
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import bannerRouter from "./routes/banner.routes.js";
import paymentRouter from "./routes/payment.routes.js";
import transactionRouter from './routes/transaction.routes.js';
import { rateLimit } from 'express-rate-limit'

const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 30, // 30 request
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  ipv6Subnet: 56,
})


const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    // If no origin (e.g., server-to-server or same-origin), allow
    if (!origin) return callback(null, true);

    const allowed = (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean);
    if (allowed.length === 0) {
      // No specific origins set - allow the origin (useful for simple deployments), but warn in logs
      console.warn('CORS_ORIGIN not set; allowing all origins (not recommended for production)');
      return callback(null, true);
    }

    if (allowed.includes(origin)) return callback(null, true);
    return callback(new Error('Not allowed by CORS'));
  }
};

app.use(cors(corsOptions));

app.use(compression())
app.use(limiter)
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/banner', bannerRouter);
app.use('/payment', paymentRouter);
app.use('/transaction', transactionRouter)

const port = process.env.PORT

app.listen(port, () => {
  console.log(`Api is running in port ${port}`);
})

export default app;