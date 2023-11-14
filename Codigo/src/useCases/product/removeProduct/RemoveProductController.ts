import { Request, Response, NextFunction } from "express";
import { IController } from "../../IController";
import { RemoveProductUseCase } from "./RemoveProductUseCase";

export class RemoveProductController implements IController {
    private removeProductUseCase: RemoveProductUseCase;

    public constructor(removeProductUseCase: RemoveProductUseCase) {
      this.removeProductUseCase = removeProductUseCase;
    }
    public async handle(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.body;

            if (!id) {
              throw new Error("Product must has an id.");
            }
            
            await this.removeProductUseCase.execute({id});

            return res.status(201).json({ message: "Product excluded" });
        } catch (error: any) {
            return res.status(400).json({
               message: error.message || "Unexpected error in Remove Product.",
            });
        }
    }
}
