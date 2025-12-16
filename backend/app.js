import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import bannerRouter from "./routes/banner.routes.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.1.15:3000"],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/product', productRouter);
app.use('/banner', bannerRouter);

app.listen(2000, "0.0.0.0", () => {
  console.log(`Api is running in port 2000`);
})

export default app;