import { Request, Response } from "express";
import { IController } from "../../IController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController implements IController {
    private createCategoryUseCase: CreateCategoryUseCase;

    public constructor(createCategoryUseCase: CreateCategoryUseCase){
        this.createCategoryUseCase = createCategoryUseCase;
    }

    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const {name, fiscalCode} = req.body;

            if(!name || !fiscalCode){
                throw new Error("Invalid fields");
            }

            await this.createCategoryUseCase.execute({name, fiscalCode});

            return res.status(200).json({message: "Category was suceffuly created."});

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Create Category."
            });
        }
    }
}