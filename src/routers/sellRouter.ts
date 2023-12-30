import { Router } from "express";
import { sellProductController } from "../useCases/sale/sellProduct";
import { authMiddleware } from "../middleware/authMiddleware";
import { viewSaleController } from "../useCases/sale/viewSale";


const router = Router();



router.post("/sell", (req, res) => {
    return sellProductController.handle(req, res);
});

router.get("/view", authMiddleware, (req, res) => {
    return viewSaleController.handle(req, res);
})





export default router;