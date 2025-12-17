import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import bannerRouter from "./routes/banner.routes.js";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(','),
  credentials: true
}));

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