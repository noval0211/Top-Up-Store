import { Router } from "express";
import { addBanner, removeBanner, showBanner} from "../controllers/bannerController.js";
import multer from "multer";

const bannerRouter = Router();

const upload = multer({ 
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }
 })

bannerRouter.post("/add",upload.single("image"), addBanner);
bannerRouter.delete("/remove", removeBanner);
bannerRouter.get("/get", showBanner);

export default bannerRouter;