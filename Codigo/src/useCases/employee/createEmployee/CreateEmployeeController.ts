import { Request, Response } from "express";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

export class CreateEmployeeController {
    private createEmployeeUseCase: CreateEmployeeUseCase;

    public constructor(createEmployeeUseCase: CreateEmployeeUseCase){
        this.createEmployeeUseCase = createEmployeeUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            const {name, job} = req.body;

            if(!name || !job){
                throw new Error("Invalid Fields.");
            }

            this.createEmployeeUseCase.execute({name, job});

            return res.status(200).json({message: "Employee was suceffuly created."})

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Create Employee."
            });
        }
    }
}