import { Request, Response } from "express";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";
import { IController } from "../../IController";
import { TotalProfitUseCase } from "./TotalProfitUseCase";

export class TotalProfitController implements IController {

    private totalProfitUseCase: TotalProfitUseCase;

    public constructor(totalProfitUseCase: TotalProfitUseCase){
        this.totalProfitUseCase = totalProfitUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response>{
        try {
            const result = await this.totalProfitUseCase.execute();

            return res.json({message: "Total profit in last 30 days.", result: result.toFixed(2)});
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Total Profit."
            });
        }
    }
}