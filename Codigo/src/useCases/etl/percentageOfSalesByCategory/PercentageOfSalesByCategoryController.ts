import { Request, Response } from "express";
import { Controller } from "../../IController";
import { PercentageOfSalesByCategoryUseCase } from "./PercentageOfSalesByCategoryUseCase";

export class PercentageOfSalesByCategoryController implements Controller {
    private percentageOfSalesByCategoryUseCase: PercentageOfSalesByCategoryUseCase;

    public constructor(percentageOfSalesByCategoryUseCase: PercentageOfSalesByCategoryUseCase){
        this.percentageOfSalesByCategoryUseCase = percentageOfSalesByCategoryUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            
            throw new Error("Not implemented");
            
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Percentage of Sales By Categories."
            });
        }
    }
}