import { MongoDBSupplierRepository } from "../../../repository/implementation/MongoDBSupplierRepository";
import { CreateSupplierController } from "./CreateSupplierController";
import { CreateSupplierUseCase } from "./CreateSupplierUseCase";

const mongoDBSupplierRepository = new MongoDBSupplierRepository();

const createSupplierUseCase = new CreateSupplierUseCase(mongoDBSupplierRepository);

const createSupplierController = new CreateSupplierController(createSupplierUseCase);

export {createSupplierUseCase, createSupplierController};