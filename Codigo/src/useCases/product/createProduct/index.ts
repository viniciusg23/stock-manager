import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { Controller } from "../../IController";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);

const createProductUseCase: CreateProductUseCase = new CreateProductUseCase(productRepository);

const createProductController: Controller = new CreateProductController(createProductUseCase);

export {createProductUseCase, createProductController};