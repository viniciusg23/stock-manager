import { Request, Response } from "express";
import { SellProductUseCase } from "./sellProductUseCase";

export class SellProductController {
    private sellProductUseCase: SellProductUseCase;

    public constructor(sellProductUseCase: SellProductUseCase){
        this.sellProductUseCase = sellProductUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            const {productId, quantity, salePrice, employeeId} = req.body;

            if(!productId || !quantity || !salePrice || !employeeId){
                throw new Error("Invalid fields.");
            }

            await this.sellProductUseCase.execute({productId, quantity, salePrice, employeeId});

            return res.json({
                message: "Sale was succefuly registered."
            })

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Sell Product."
            });
        }
    }
}