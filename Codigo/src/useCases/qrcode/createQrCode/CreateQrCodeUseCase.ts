import { ICreateQrCodeDTO } from "./ICreateQrCodeDTO";
import qrCode from "qrcode";

export class CreateQrCodeUseCase {
        
    public async execute(data: ICreateQrCodeDTO): Promise<string>{
        const {protocol, host, id} = data;

        const url = `${protocol}://${host}/sell/${id}`;

        const createdQrCode = await qrCode.toDataURL(url);

        if(!createdQrCode){
            throw new Error("Was not possible to create the QR Code.");
        }

        return createdQrCode;
    }
}