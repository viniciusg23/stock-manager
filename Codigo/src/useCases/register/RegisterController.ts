import { Request, Response } from "express";
import { Controller } from "../IController";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterController implements Controller {
    private registerUseCase: RegisterUseCase;

    public constructor(registerUseCase: RegisterUseCase){
        this.registerUseCase =registerUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response>{
        try {
            const {name, password} = req.body;

            if(!name || !password){
                return res.status(400).json({
                    message: "Invalid fields"
                });
            }

            await this.registerUseCase.execute({name: name, password: password});

            return res.status(201).send("User created");

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Register User."
            });
        }
    }
}