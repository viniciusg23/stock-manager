import { Request, Response } from "express";
import { ViewEmployeeUseCase } from "./ViewEmployeeUseCase";

export class ViewEmployeeController {
    private viewEmployeeUseCase: ViewEmployeeUseCase;

    public constructor(viewEmployeeUseCase: ViewEmployeeUseCase){
        this.viewEmployeeUseCase = viewEmployeeUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            const allEmployees = await this.viewEmployeeUseCase.execute();

            return res.status(200).json({
                message: "All employees founded.",
                employees: allEmployees
            });

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in View Employee."
            });
        }
    }
}