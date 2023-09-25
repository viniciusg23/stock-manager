import { Request, Response } from "express";
import { Controller } from "../../IController";
import { ViewSupplierUseCase } from "./ViewSupplierUseCase";

export class ViewSupplierController implements Controller{

    private viewSupplierUseCase: ViewSupplierUseCase;

    public constructor(viewSupplierUseCase: ViewSupplierUseCase){
        this.viewSupplierUseCase = viewSupplierUseCase;
    }
    
    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const suppliers = await this.viewSupplierUseCase.execute();
            
            return res.status(200).json({
                msg: "All suppliers founded",
                suppliers: suppliers
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error"
            });
        }
    }
}