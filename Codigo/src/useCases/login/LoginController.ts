import { Request, Response } from "express";
import { LoginUseCase } from "./LoginUseCase";
import { Controller } from "../IController";

export class LoginController implements Controller {

    private loginUseCase: LoginUseCase;

    public constructor(loginUseCase: LoginUseCase){
        this.loginUseCase = loginUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const {name, password} = req.body;

            if(!name || !password){
                return res.status(400).json({
                    message: "Invalid fields"
                });
            }

            const token = await this.loginUseCase.execute({name: name, password: password});

            return res.status(200).json({
                message: "Login was sucefful.",
                authorization: token 
            })

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Login User."
            });
        }
    }
}