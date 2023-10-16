import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { Controller } from "../../IController";
import { RemoveSupplierController } from "./RemoveSupplierController";
import { RemoveSupplierUseCase } from "./RemoveSupplierUseCase";

const mongoDBSupplierRepository = new MongoDBSupplierRepository();

const removeSupplierUseCase = new RemoveSupplierUseCase(
  mongoDBSupplierRepository
); // Corrected instantiation

const removeSupplierController: Controller = new RemoveSupplierController(
  removeSupplierUseCase
);

export { removeSupplierUseCase, removeSupplierController };
