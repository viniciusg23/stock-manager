import { Request, Response, NextFunction } from "express";
import { Controller } from "../../IController";
import { RemoveProductUseCase } from "./RemoveProductUseCase";
export class RemoveProductController implements Controller {
  private removeProductUseCase: RemoveProductUseCase;

  public constructor(removeProductUseCase: RemoveProductUseCase) {
    this.removeProductUseCase = removeProductUseCase;
  }
  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { code } = req.body;

      if (code === null) {
        throw new Error("Product must has a code.");
      }
      await this.removeProductUseCase.execute(code);
      return res.status(201).json({ message: "Product excluded" });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Unexpected error in Remove Product.",
      });
    }
  }
}
