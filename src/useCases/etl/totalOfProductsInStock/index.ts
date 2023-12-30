import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { IController } from "../../IController";
import { TotalOfProductsInStockController } from "./TotalOfProductsInStockController";
import { TotalOfProductsInStockUseCase } from "./TotalOfProductsInStockUseCase";


const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);

const totalOfProductsInStockUseCase: TotalOfProductsInStockUseCase = new TotalOfProductsInStockUseCase(productRepository);

const totalOfProductsInStockController: IController = new TotalOfProductsInStockController(totalOfProductsInStockUseCase);

export {totalOfProductsInStockUseCase, totalOfProductsInStockController};