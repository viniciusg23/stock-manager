import { Router } from "express";
import { createEmployeeController } from "../useCases/employee/createEmployee";
import { viewEmployeeController } from "../useCases/employee/viewEmployee";

const router = Router();

router.post("/create", (req, res) => {
    return createEmployeeController.handle(req, res);
});

router.get("/view", (req, res) => {
    return viewEmployeeController.handle(req, res);
});




export default router;