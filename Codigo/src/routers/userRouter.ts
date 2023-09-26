import { Router } from "express";
import { generateCustomCodeController } from "../useCases/generateCustomCode";
import { loginController } from "../useCases/login";
import { registerController } from "../useCases/register";


const router = Router();

router.get("/gen-code", (req, res) => {
    return generateCustomCodeController.handle(req, res);
});

router.post("/login", (req, res) => {
    return loginController.handle(req, res);
})

router.post("/register", (req, res) => {
    return registerController.handle(req, res);
})


export default router;