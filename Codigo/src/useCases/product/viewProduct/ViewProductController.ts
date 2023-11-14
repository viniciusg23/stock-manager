import { Request, Response } from "express";
import { IController } from "../../IController";
import { ViewProductUseCase } from "./ViewProductUseCase";

export class ViewProductController implements IController {

    private viewProductsUseCase: ViewProductUseCase;

    public constructor(viewProductsUseCase: ViewProductUseCase){
        this.viewProductsUseCase = viewProductsUseCase;
    }


    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const allProducts = await this.viewProductsUseCase.execute();

            return res.status(200).json({
                message: "All products founded.",
                products: allProducts
            });
            
        } catch (error : any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in View Product."
            });
        }
    }
}