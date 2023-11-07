import { Product } from "../../../entities/Product";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { ICreateProductRequestDTO } from "./CreateProductDTO";

export class CreateProductUseCase {
  private productRepository: IProductRepository;

  public constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(data: ICreateProductRequestDTO) {
    // TODO: gerar codigo personalizado do cliente
    // * No momento vou gerar qualquer codigo aleatorio...
    const code = Math.random();

    const product = new Product(
      data.isFiscal,
      data.category,
      data.name,
      data.quantity,
      data.costPrice,
      data.salePrice,
      data.purchaseMonth,
      data.purchaseYear,
      data.supplier,
      code.toString()
    );

    await this.productRepository.create(product);
  }
}
