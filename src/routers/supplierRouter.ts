import { Router } from "express";
import { createSupplierController } from "../useCases/supplier/createSupplier/index";
import { viewSupplierController } from "../useCases/supplier/viewSupplier/index";
import { authMiddleware } from "../middleware/authMiddleware";
import { removeSupplierController } from "../useCases/supplier/removeSupplier";

const router = Router();

router.post("/create", authMiddleware, (req, res) => {
    return createSupplierController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewSupplierController.handle(req, res);
});

router.post("/remove", authMiddleware, (req, res) => {
    return removeSupplierController.handle(req, res);
})



export default router;