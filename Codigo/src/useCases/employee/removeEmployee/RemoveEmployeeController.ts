import { Request, Response } from "express";
import { Controller } from "../../IController";
import { RemoveEmployeeUseCase } from "./RemoveEmployeeUseCase";

export class RemoveEmployeeController implements Controller {
    private removeEmployeeUseCase: RemoveEmployeeUseCase;

    public constructor(removeEmployeeUseCase: RemoveEmployeeUseCase) {
        this.removeEmployeeUseCase = removeEmployeeUseCase;
    }

    public async handle(req: Request, res: Response) {
        try {
            const { id } = req.body;

            if(!id){
                throw new Error("Invalid Fields.");
            }

            this.removeEmployeeUseCase.execute(id);

            return res.status(200).json({message: "Employee was suceffuly removed."})

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Remove Employee."
            });
        }
    }
}