import { Request, Response } from "express";
import { IController } from "../../IController";
import { TotalOfProductsInStockUseCase } from "./TotalOfProductsInStockUseCase";

export class TotalOfProductsInStockController implements IController {
    private totalOfProductsInStockUseCase: TotalOfProductsInStockUseCase;

    public constructor(totalOfProductsInStockUseCase: TotalOfProductsInStockUseCase){
        this.totalOfProductsInStockUseCase = totalOfProductsInStockUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response>{
        try {
            const result = await this.totalOfProductsInStockUseCase.execute();

            return res.json({message: "All data found.", result: result});
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Total Products In Stock."
            });
        }
    }
}