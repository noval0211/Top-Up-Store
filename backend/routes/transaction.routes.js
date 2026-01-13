import { Router } from "express"
import { HistoryClient } from "../controllers/transaction.controller.js"
import { FirebaseWare } from "../middleware/FirebaseAuth.js"

const transactionRouter = Router()

transactionRouter.get('/', FirebaseWare, HistoryClient)

export default transactionRouter