import { Request, Response } from "express";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { EditProductUseCase } from "./EditProductUseCase";

export class EditProductController {
    private editProductUseCase: EditProductUseCase;

    public constructor(editProductUseCase: EditProductUseCase){
        this.editProductUseCase = editProductUseCase;
    }

    public async handle(req: Request, res: Response){
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

            await this.editProductUseCase.execute(req.body);

            return res.status(201).json({message: "Product Updated"});
            
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Edit Product."
            });
        }
    }
}