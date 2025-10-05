import express from "express";
import cors from "cors";

import { PORT } from './config/env.js'

import authRouter from "./routes/auth.js";
import userRouter from "./models/user.model.js";

const app = express()

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

app.listen(PORT, () => {
  console.log(`Api is running in port ${PORT}`)
})

export default app