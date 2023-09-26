import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { Controller } from "../../IController";
import { CreateProductController } from "./CreateProductController";
import { CreateProductUseCase } from "./CreateProductUseCase";

const mongoDBProductRepository: IProductRepository = new MongoDBProductRepository();

const createProductUseCase: CreateProductUseCase = new CreateProductUseCase(mongoDBProductRepository);

const createProductController: Controller = new CreateProductController(createProductUseCase);

export {createProductUseCase, createProductController};