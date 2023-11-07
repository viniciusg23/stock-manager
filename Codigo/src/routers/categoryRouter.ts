import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { createCategoryController } from "../useCases/category/createCategory";
import { removeCategoryController } from "../useCases/category/removeCategory";
import { viewCategoryController } from "../useCases/category/viewCategory";

const router = Router();

router.post("/create", authMiddleware, (req, res) => {
    return createCategoryController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewCategoryController.handle(req, res);
});

router.post("/remove", (req, res) => {
    return removeCategoryController.handle(req, res);
})




export default router;