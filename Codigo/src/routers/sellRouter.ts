import { Router } from "express";
import { createQrCodeController } from "../useCases/qrcode/createQrCode";
import { sellProductController } from "../useCases/sale/sellProduct";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();

router.get("/create-qrcode/:id", authMiddleware, (req, res) => {
    return createQrCodeController.handle(req, res);
});

router.post("/", (req, res) => {
    return sellProductController.handle(req, res);
})

// router.post("/", (req, res) => {
//     return sellProductController.handle(req, res);
// })


export default router;