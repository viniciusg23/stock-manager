import { Request, Response } from "express";
import { IController } from "../../IController";
import { RemoveCategoryUseCase } from "./RemoveCategoryUseCase";

export class RemoveCategoryController implements IController {
    private removeCategoryUseCase: RemoveCategoryUseCase;

    public constructor(removeCategoryUseCase: RemoveCategoryUseCase){
        this.removeCategoryUseCase = removeCategoryUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            const {id} = req.body;

            if(!id){
                throw new Error("Invalid Fields.");
            }

            await this.removeCategoryUseCase.execute({id});

            return res.json({message: "Category removed."});
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Remove Category."
            });
        }
    }
} 