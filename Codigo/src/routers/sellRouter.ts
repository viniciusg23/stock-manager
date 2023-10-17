import { Router } from "express";
import { createQrCodeController } from "../useCases/qrcode/createQrCode";
import { sellProductController } from "../useCases/sale/sellProduct";


const router = Router();

router.get("/create-qrcode/:id", (req, res) => {
    return createQrCodeController.handle(req, res);
});

router.post("/", (req, res) => {
    return sellProductController.handle(req, res);
})




export default router;