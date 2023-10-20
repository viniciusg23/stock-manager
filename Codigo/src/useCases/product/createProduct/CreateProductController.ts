import { Request, Response } from "express";
import { Controller } from "../../IController";
import { CreateProductUseCase } from "./CreateProductUseCase";

export class CreateProductController implements Controller {
   
    private createProductUseCase: CreateProductUseCase;

    public constructor(createProductUseCase: CreateProductUseCase){
        this.createProductUseCase = createProductUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { category,  name, costPrice, salePrice } = req.body;

            if (!name || name.trim() === "") {
                throw new Error("Product must has a name.");
            }

            if (!category || category.trim() === "") {
                throw new Error("Product must has a category.");
            }
    
            if (costPrice < 0 || salePrice < 0) {
                throw new Error("Invalid cost price or sale price.");
            }

            await this.createProductUseCase.execute(req.body);

            return res.status(201).json({message: "Product registered"})

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Create Product."
            });
        }
    }
    
}