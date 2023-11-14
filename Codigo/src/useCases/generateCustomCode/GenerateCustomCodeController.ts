import { Response, Request } from "express";
import { IController } from "../IController";
import { gerarPlanilha } from "./GenerateCustomCodeUseCase";
import { ViewProductUseCase } from "../product/viewProduct/ViewProductUseCase";

export class GenerateCustomCodeController implements IController {

    private viewProductsUseCase: ViewProductUseCase;

    public constructor(viewProductsUseCase: ViewProductUseCase){
        this.viewProductsUseCase = viewProductsUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const allProducts = await this.viewProductsUseCase.execute();

            gerarPlanilha(allProducts);

            return res.status(200).send("File Created");
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Generate Custom Code."
            });
        }
    }
}