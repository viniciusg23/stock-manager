import { Router } from "express";

import { createProductController } from "../useCases/product/createProduct";
import { viewProductController } from "../useCases/product/viewProduct";
import { editProductController } from "../useCases/product/editProduct";
import { authMiddleware } from "../middleware/authMiddleware";
import { removeProductController } from "../useCases/product/removeProduct";
import { createQrCodeController } from "../useCases/qrcode/createQrCode";


const router = Router();

router.post("/create", authMiddleware, (req, res) => {
    return createProductController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewProductController.handle(req, res);
});

router.post("/edit", authMiddleware, (req, res) => {
    return editProductController.handle(req, res);
});

router.post("/remove", authMiddleware, (req, res) => {
    return removeProductController.handle(req, res);
})

router.get("/create-qrcode/:id", authMiddleware, (req, res) => {
    return createQrCodeController.handle(req, res);
});


export default router;