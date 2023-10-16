import { Request, Response } from "express";
import { RemoveSupplierUseCase } from "./RemoveSupplierUseCase";
import { Controller } from "../../IController";

export class RemoveSupplierController implements Controller {
  private removeSupplierUseCase: RemoveSupplierUseCase;

  public constructor(removeSupplierUseCase: RemoveSupplierUseCase) {
    this.removeSupplierUseCase = removeSupplierUseCase;
  }

  public async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;
      if (name === null) {
        throw new Error("Supplier must have a name.");
      }

      await this.removeSupplierUseCase.execute(name);

      return res.status(201).json({ message: "Supplier excluded" });
    } catch (error: any) {
      return res.status(400).json({
        message: error.message || "Unexpected error in Remove Supplier.",
      });
    }
  }
}
