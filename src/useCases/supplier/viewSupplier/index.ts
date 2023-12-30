
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { IController } from "../../IController";
import { ViewSupplierController } from "./ViewSupplierController";
import { ViewSupplierUseCase } from "./ViewSupplierUseCase";

const mongoDBSupplierRepository = new MongoDBSupplierRepository();

const viewSupplierUseCase = new ViewSupplierUseCase(mongoDBSupplierRepository);

const viewSupplierController: IController = new ViewSupplierController(viewSupplierUseCase);

export {viewSupplierUseCase, viewSupplierController};