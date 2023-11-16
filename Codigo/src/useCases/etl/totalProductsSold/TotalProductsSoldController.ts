import { Request, Response } from "express";
import { IController } from "../../IController";
import { TotalProductsSoldUseCase } from "./TotalProductsSoldUseCase";

export class TotalProductsSoldController implements IController {
    private totalProductsSoldUseCase: TotalProductsSoldUseCase;

    public constructor(totalProductsSoldUseCase: TotalProductsSoldUseCase){
        this.totalProductsSoldUseCase = totalProductsSoldUseCase;
    }

    public async handle(req: Request, res: Response) {
        try {
            const result = await this.totalProductsSoldUseCase.execute();

            return res.json({message: "All data found.", result: result});
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Total Products sold."
            });
        }
    }
}