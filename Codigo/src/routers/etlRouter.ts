import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { percentageOfSalesByController } from "../useCases/etl/percentageOfSalesByCategory";

const router = Router();

router.get("/percentage-sales-category", authMiddleware, (req, res) => {
    return percentageOfSalesByController.handle(req, res);
});




export default router;