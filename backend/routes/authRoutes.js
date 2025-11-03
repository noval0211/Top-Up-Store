
import { Router } from "express";
import { Login, Register, Logout, Me } from "../controllers/authController.js";


const authRouter = Router();

authRouter.post("/register", Register);
authRouter.post("/login", Login);
authRouter.post("/logout", Logout);
authRouter.get("/me", Me);

export default authRouter
