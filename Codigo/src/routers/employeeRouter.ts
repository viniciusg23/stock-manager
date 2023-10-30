import { Router } from "express";
import { createEmployeeController } from "../useCases/employee/createEmployee";
import { viewEmployeeController } from "../useCases/employee/viewEmployee";
import { authMiddleware } from "../middleware/authMiddleware";
import { removeEmployeeController } from "../useCases/employee/removeEmployee";

const router = Router();

router.post("/create", authMiddleware, (req, res) => {
    return createEmployeeController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewEmployeeController.handle(req, res);
});

router.post("/remove", (req, res) => {
    return removeEmployeeController.handle(req, res);
})




export default router;