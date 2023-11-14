import { Product } from "../../../entities/Product";
import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { ICreateProductRequestDTO } from "./CreateProductDTO";

export class CreateProductUseCase {
  private productRepository: IProductRepository;
  private categoryRepository: ICategoryRepository;
  private supplierRepository: ISupplierRepository;

  public constructor(productRepository: IProductRepository, categoryRepository: ICategoryRepository, supplierRepository: ISupplierRepository) {
    this.productRepository = productRepository;
    this.categoryRepository = categoryRepository;
    this.supplierRepository = supplierRepository;
  }

  public async execute(data: ICreateProductRequestDTO) {
    // TODO: gerar codigo personalizado do cliente
    // * No momento vou gerar qualquer codigo aleatorio...
    const code = Math.random();

    const product = new Product(
      data.isFiscal,
      await this.categoryRepository.findById(data.category),
      data.name,
      data.quantity,
      data.costPrice,
      data.salePrice,
      data.purchaseMonth,
      data.purchaseYear,
      await this.supplierRepository.findById(data.supplier),
      code.toString()
    );

    await this.productRepository.create(product);
  }
}
