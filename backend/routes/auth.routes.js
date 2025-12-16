import { Router } from "express";
import { FirebaseWare } from "../middleware/FirebaseAuth.js";
import { getMe, GoogleAuth } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/me", FirebaseWare, getMe);
authRouter.post("/firebase", FirebaseWare, GoogleAuth)

export default authRouter
