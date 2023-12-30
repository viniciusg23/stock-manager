import { Request, Response } from "express";
import { CreateQrCodeUseCase } from "./CreateQrCodeUseCase";

export class CreateQrCodeController {
    private createQrCodeUseCase: CreateQrCodeUseCase;

    public constructor(createQrCodeUseCase: CreateQrCodeUseCase){
        this.createQrCodeUseCase = createQrCodeUseCase;
    }

    public async handle(req: Request, res: Response){
        try {
            const { id } = req.params;

            const protocol = req.protocol;

            const host = req.get("host");

            if(!id || !protocol || !host){
                throw new Error("Was not possible to create the QR Code");
            }

            const createdQrCode = await this.createQrCodeUseCase.execute({protocol, host, id});

            return res.send({message: "QR Code was sucefully created.", qrCode: createdQrCode});

        } catch (error: any) {
            return res.status(400).json({
                message: error.message || "Unexpected error in Create Qr Code."
            });
        }
    }
}