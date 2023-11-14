import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { IController } from "../../IController";
import { RemoveSupplierController } from "./RemoveSupplierController";
import { RemoveSupplierUseCase } from "./RemoveSupplierUseCase";

const mongoDBSupplierRepository = new MongoDBSupplierRepository();

const removeSupplierUseCase = new RemoveSupplierUseCase(
  mongoDBSupplierRepository
); // Corrected instantiation

const removeSupplierController: IController = new RemoveSupplierController(
  removeSupplierUseCase
);

export { removeSupplierUseCase, removeSupplierController };
