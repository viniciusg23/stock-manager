import { Router } from "express";

import { createProductController } from "../useCases/product/createProduct";
import { viewProductController } from "../useCases/product/viewProduct";


const router = Router();

router.post("/create", (req, res) => {
    return createProductController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewProductController.handle(req, res);
});




export default router;