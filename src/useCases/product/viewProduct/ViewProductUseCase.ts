import { getMonthValue } from "../../../entities/Product";
import { Product } from "../../../entities/Product";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";

export class ViewProductUseCase {
    private productRepository: IProductRepository;

    constructor(productRepository: IProductRepository){
        this.productRepository = productRepository;
    }

    public async execute(): Promise<Product[]> {
        const allProducts = await this.productRepository.findAll();

        return allProducts;
    }
}