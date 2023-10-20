import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";
import { MongoDBSaleRepository } from "../../../repository/saleRepository/implementation/MongoDBSaleRepository";
import { EditProductUseCase } from "../../product/editProduct/EditProductUseCase";
import { SellProductController } from "./SellProductController";
import { SellProductUseCase } from "./SellProductUseCase";

const saleRepository: ISaleRepository = new MongoDBSaleRepository();
const productRepository: IProductRepository = new MongoDBProductRepository();
const editProductUseCase: EditProductUseCase = new EditProductUseCase(productRepository);

const sellProductUseCase: SellProductUseCase = new SellProductUseCase(saleRepository, productRepository, editProductUseCase);

const sellProductController: SellProductController = new SellProductController(sellProductUseCase);

export {sellProductUseCase, sellProductController};