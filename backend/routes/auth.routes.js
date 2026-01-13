import { Router } from "express";
import { FirebaseWare } from "../middleware/FirebaseAuth.js";
import { GetMe, GoogleAuth, AnonymousAuth } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/me", FirebaseWare, GetMe);
authRouter.post("/anonymous", AnonymousAuth)
authRouter.post("/firebase", GoogleAuth)

export default authRouter
