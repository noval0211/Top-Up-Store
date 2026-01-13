import { Router } from "express";
import { FirebaseWare } from "../middleware/FirebaseAuth.js";
import { GetMe, GoogleAuth, AnonymousAuth, Logout } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/me", FirebaseWare, GetMe);
authRouter.post("/anonymous", AnonymousAuth)
authRouter.post("/firebase", GoogleAuth)
authRouter.post("/logout", Logout)

export default authRouter
