import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { Controller } from "../../IController";
import { ViewProductController } from "./ViewProductController";
import { ViewProductUseCase } from "./ViewProductUseCase";

const productRepository: IProductRepository = new MongoDBProductRepository();

const viewProductUseCase: ViewProductUseCase = new ViewProductUseCase(productRepository);

const viewProductController: Controller = new ViewProductController(viewProductUseCase);

export {viewProductUseCase, viewProductController};