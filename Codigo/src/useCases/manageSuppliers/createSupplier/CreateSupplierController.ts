import { Request, Response } from "express";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";
import { Controller } from "../../IController";

export class CreateSupplierController implements Controller{

    private createSupplierUseCase: CreateSupplierUseCase;

    public constructor(createSupplierUseCase: CreateSupplierUseCase){
        this.createSupplierUseCase = createSupplierUseCase;
    }
    
    public async handle(req: Request, res: Response): Promise<Response> {
        const {name, description} = req.body;

        if(!name){
            return res.status(401).send("Supplier name not especified.");
        }

        try {
            await this.createSupplierUseCase.execute({
                name: name,
                description: description ? description : ""
            });
            
            return res.status(201).send();
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Create Supplier."
            });
        }

    }
}