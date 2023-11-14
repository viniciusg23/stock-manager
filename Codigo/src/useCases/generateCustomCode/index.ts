import { ICategoryRepository } from "../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { IProductRepository } from "../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../repository/productRepository/implementation/MongoDBProductRepository";
import { ISupplierRepository } from "../../repository/supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { IController } from "../IController";
import { ViewProductUseCase } from "../product/viewProduct/ViewProductUseCase";
import { GenerateCustomCodeController } from "./GenerateCustomCodeController";

const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);

const viewProductsUseCase: ViewProductUseCase = new ViewProductUseCase(productRepository);

const generateCustomCodeController: IController = new GenerateCustomCodeController(viewProductsUseCase);

export {viewProductsUseCase, generateCustomCodeController};