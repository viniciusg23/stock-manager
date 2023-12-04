import { Request, Response } from "express";
import { IController } from "../../IController";

export class ValidateController implements IController {

    public async handle(req: Request, res: Response){
        try {
            return res.status(202).json({message: "Valid authorization"});
        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Validate User."
            });
        }
    }
}