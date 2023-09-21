import { Router } from "express";
import { createSupplierController } from "../useCases/manageSuppliers/createSupplier";

const router = Router();

router.post("/create", (req, res) => {
    return createSupplierController.handle(req, res);
});




export { router };