
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { Controller } from "../../IController";
import { ViewSupplierController } from "./ViewSupplierController";
import { ViewSupplierUseCase } from "./ViewSupplierUseCase";

const mongoDBSupplierRepository = new MongoDBSupplierRepository();

const viewSupplierUseCase = new ViewSupplierUseCase(mongoDBSupplierRepository);

const viewSupplierController: Controller = new ViewSupplierController(viewSupplierUseCase);

export {viewSupplierUseCase, viewSupplierController};