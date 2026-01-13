import { Router } from "express";
import { CreatePayment, GetPaymentStatus } from "../controllers/payment.controller.js";
import { FirebaseWare} from "../middleware/FirebaseAuth.js"

const paymentRouter = Router();

paymentRouter.post('/create', FirebaseWare, CreatePayment);
paymentRouter.post('/handling', GetPaymentStatus)

export default paymentRouter;
