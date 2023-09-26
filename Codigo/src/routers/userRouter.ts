import { Router } from "express";
import { generateCustomCodeController } from "../useCases/generateCustomCode";


const router = Router();

router.get("/gen-code", (req, res) => {
    return generateCustomCodeController.handle(req, res);
});


export default router;