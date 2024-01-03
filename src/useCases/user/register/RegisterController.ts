import { Request, Response } from "express";
import { IController } from "../../IController";
import { RegisterUseCase } from "./RegisterUseCase";

export class RegisterController implements IController {
    private registerUseCase: RegisterUseCase;

    public constructor(registerUseCase: RegisterUseCase){
        this.registerUseCase = registerUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response>{
        try {
            const {name, password, systemPassword} = req.body;

            if(!name || !password || !systemPassword){
                return res.status(400).json({
                    message: "Invalid fields"
                });
            }

            await this.registerUseCase.execute({name: name, password: password, systemPassword: systemPassword});

            return res.status(201).json({message: "User created"});

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Register User."
            });
        }
    }
}