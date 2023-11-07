import { Product } from "../../../entities/Product";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { IEditProductDTO } from "./IEditProductDTO";

export class EditProductUseCase {
    private productRepository: IProductRepository;

    public constructor(productRepository: IProductRepository){
        this.productRepository = productRepository;
    }

    public async execute(data: IEditProductDTO){
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
            data.code,
            data.id
        );
      
        await this.productRepository.update(data.id, product);
    }
}