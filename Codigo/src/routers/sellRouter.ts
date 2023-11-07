import { Router } from "express";
import { sellProductController } from "../useCases/sale/sellProduct";
import { authMiddleware } from "../middleware/authMiddleware";


const router = Router();



router.post("/", (req, res) => {
    return sellProductController.handle(req, res);
})



export default router;