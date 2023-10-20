import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { EditProductController } from "./EditProductController";
import { EditProductUseCase } from "./EditProductUseCase";

const productRepository: IProductRepository = new MongoDBProductRepository();

const editProductUseCase: EditProductUseCase = new EditProductUseCase(productRepository);

const editProductController: EditProductController = new EditProductController(editProductUseCase);

export {editProductUseCase, editProductController};