import { Request, Response } from "express";
import { Controller } from "../../IController";
import { ViewSaleUseCase } from "./ViewSaleUseCase";

export class ViewSaleController implements Controller {
    private viewSaleUseCase: ViewSaleUseCase;

    public constructor(viewSaleUseCase: ViewSaleUseCase){
        this.viewSaleUseCase = viewSaleUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            const result = await this.viewSaleUseCase.execute();

            return res.status(200).json({
                message: "All sales found.",
                sales: result
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in View Sale."
            });
        }
    }
}