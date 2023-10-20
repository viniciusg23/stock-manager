import { Router } from "express";

import { createProductController } from "../useCases/product/createProduct";
import { viewProductController } from "../useCases/product/viewProduct";
import { editProductController } from "../useCases/product/editProduct";


const router = Router();

router.post("/create", (req, res) => {
    return createProductController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewProductController.handle(req, res);
});

router.post("/edit", (req, res) => {
    return editProductController.handle(req, res);
})




export default router;