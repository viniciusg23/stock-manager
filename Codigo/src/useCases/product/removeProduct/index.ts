import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { Controller } from "../../IController";
import { RemoveProductController } from "./RemoveProductController";
import { RemoveProductUseCase } from "./RemoveProductUseCase";

const mongoDBProductRepository: IProductRepository =
  new MongoDBProductRepository();
const removeProductUseCase: RemoveProductUseCase = new RemoveProductUseCase(
  mongoDBProductRepository
);

const removeProductController: Controller = new RemoveProductController(
  removeProductUseCase
);

export { removeProductUseCase, removeProductController };
