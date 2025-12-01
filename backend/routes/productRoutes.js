
import { Router } from "express";
import { CreateProduct, Product, GetProductById } from "../controllers/productController.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
 })

productRouter.post("/add", upload.single("image") ,CreateProduct)
productRouter.get("/get", Product)
productRouter.get("/get/:id", GetProductById)

export default productRouter