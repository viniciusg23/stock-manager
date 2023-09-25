import { Router } from "express";
import { createSupplierController } from "../useCases/manageSuppliers/createSupplier/index";
import { viewSupplierController } from "../useCases/manageSuppliers/viewSupplier/index";

const router = Router();

router.post("/create", (req, res) => {
    return createSupplierController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewSupplierController.handle(req, res);
});




export default router;