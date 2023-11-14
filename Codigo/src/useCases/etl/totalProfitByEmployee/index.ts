import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { MongoDBEmployeeRepository } from "../../../repository/employeeRepository/implementation/MongoDBEmployeeRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";
import { MongoDBSaleRepository } from "../../../repository/saleRepository/implementation/MongoDBSaleRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";
import { IController } from "../../IController";
import { TotalProfitByEmployeeController } from "./TotalProfitByEmployeeController";
import { TotalProfitByEmployeeUseCase } from "./totalProfitByEmployeeUseCase";

const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();

const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);

const employeeRepository: IEmployeeRepository = new MongoDBEmployeeRepository();

const saleRepository: ISaleRepository = new MongoDBSaleRepository(productRepository, employeeRepository);

const totalProfitByEmployeeUseCase: TotalProfitByEmployeeUseCase = new TotalProfitByEmployeeUseCase(saleRepository);

const totalProfitByEmployeeController: IController = new TotalProfitByEmployeeController(totalProfitByEmployeeUseCase);

export {totalProfitByEmployeeUseCase, totalProfitByEmployeeController};

