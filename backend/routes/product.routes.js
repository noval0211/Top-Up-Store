import { Router } from "express";
import { CreateProduct, GetProductById, GetProduct, GetProductByType, DeleteProductById, CreateProductPacks } from "../controllers/product.controller.js";
import multer from "multer";

const productRouter = Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
})

productRouter.get("/", GetProduct)
productRouter.post("/add", upload.single("image"), CreateProduct)
productRouter.get("/get", GetProductByType)
productRouter.get("/get/:id", GetProductById)
productRouter.delete("/delete/:id", DeleteProductById)
productRouter.post('/add-pack',upload.none(),  CreateProductPacks)

export default productRouter