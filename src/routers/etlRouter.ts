import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { percentageOfSalesByController } from "../useCases/etl/percentageOfSalesByCategory";
import { totalProfitController } from "../useCases/etl/totalProfit";
import { totalProfitByEmployeeController } from "../useCases/etl/totalProfitByEmployee";
import { totalProductsSoldController } from "../useCases/etl/totalProductsSold";
import { totalOfProductsInStockController } from "../useCases/etl/totalOfProductsInStock";

const router = Router();

router.get("/percentage-sales-category", authMiddleware, (req, res) => {
    return percentageOfSalesByController.handle(req, res);
});

router.get("/total-profit", authMiddleware, (req, res) => {
    return totalProfitController.handle(req, res);
});

router.get("/total-profit-employee", authMiddleware, (req, res) => {
    return totalProfitByEmployeeController.handle(req, res);
});

router.get("/total-product-sold", authMiddleware, (req, res) => {
    return totalProductsSoldController.handle(req, res);
});

router.get("/total-products-stock", authMiddleware, (req, res) => {
    return totalOfProductsInStockController.handle(req, res);
});




export default router;