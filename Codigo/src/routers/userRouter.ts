import { Router } from "express";
import { loginController } from "../useCases/user/login";
import { registerController } from "../useCases/user/register";
import { validateController } from "../useCases/user/validate";


const router = Router();

router.get("/validate", (req, res) => {
    return validateController.handle(req, res);
})

router.post("/login", (req, res) => {
    return loginController.handle(req, res);
})

router.post("/register", (req, res) => {
    return registerController.handle(req, res);
})


export default router;