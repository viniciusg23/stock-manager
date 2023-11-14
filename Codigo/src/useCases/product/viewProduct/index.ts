import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { Controller } from "../../IController";
import { ViewProductController } from "./ViewProductController";
import { ViewProductUseCase } from "./ViewProductUseCase";

const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);

const viewProductUseCase: ViewProductUseCase = new ViewProductUseCase(productRepository);

const viewProductController: Controller = new ViewProductController(viewProductUseCase);

export {viewProductUseCase, viewProductController};