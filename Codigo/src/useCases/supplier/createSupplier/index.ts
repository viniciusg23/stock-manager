import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { Controller } from "../../IController";
import { CreateSupplierController } from "./CreateSupplierController";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";

const mongoDBSupplierRepository = new MongoDBSupplierRepository();

const createSupplierUseCase = new CreateSupplierUseCase(mongoDBSupplierRepository);

const createSupplierController: Controller = new CreateSupplierController(createSupplierUseCase);

export {createSupplierUseCase, createSupplierController};