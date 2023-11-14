import { IProductRepository } from "../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../repository/productRepository/implementation/MongoDBProductRepository";
import { IController } from "../IController";
import { ViewProductUseCase } from "../product/viewProduct/ViewProductUseCase";
import { GenerateCustomCodeController } from "./GenerateCustomCodeController";

const productRepository: IProductRepository = new MongoDBProductRepository()

const viewProductsUseCase: ViewProductUseCase = new ViewProductUseCase(productRepository);

const generateCustomCodeController: IController = new GenerateCustomCodeController(viewProductsUseCase);

export {viewProductsUseCase, generateCustomCodeController};