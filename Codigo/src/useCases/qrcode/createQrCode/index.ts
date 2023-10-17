import { CreateQrCodeController } from "./CreateQrCodeController";
import { CreateQrCodeUseCase } from "./CreateQrCodeUseCase";

const createQrCodeUseCase: CreateQrCodeUseCase = new CreateQrCodeUseCase();

const createQrCodeController: CreateQrCodeController = new CreateQrCodeController(createQrCodeUseCase);

export {createQrCodeUseCase, createQrCodeController};