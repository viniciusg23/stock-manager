import { Request, Response } from "express";
import { IController } from "../../IController";
import { TotalProfitByEmployeeUseCase } from "./totalProfitByEmployeeUseCase";

export class TotalProfitByEmployeeController implements IController {
    private totalProfitByEmployeeUseCase: TotalProfitByEmployeeUseCase;

    public constructor(totalProfitByEmployeeUseCase: TotalProfitByEmployeeUseCase){
        this.totalProfitByEmployeeUseCase = totalProfitByEmployeeUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response>{
        try {
            const result = await this.totalProfitByEmployeeUseCase.execute();

            const arrayResult = Array.from(result, ([key, value]) => ({ employee: key, totalSale: value }));

            return res.json({message: "All data found", result: arrayResult});
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Total Profit By Employee."
            });
        }
    }
}