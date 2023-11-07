import { Request, Response } from "express";
import { Controller } from "../../IController";
import { ViewCategoryUseCase } from "./ViewCategoryUseCase";

export class ViewCategoryController implements Controller {
    private viewCategoryUseCase: ViewCategoryUseCase;

    public constructor(viewCategoryUseCase: ViewCategoryUseCase){
        this.viewCategoryUseCase = viewCategoryUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response>{
        try {
            const allCategories = await this.viewCategoryUseCase.execute();
            return res.json({message: "All categories founded", categories: allCategories})
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in View Employee."
            });
        }
    }
}