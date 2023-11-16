import { IProductRepository } from "../../../repository/productRepository/IProductRepository";

export class TotalOfProductsInStockUseCase {
    private productRepository: IProductRepository;

    public constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async execute(): Promise<number> {
        const result = await this.productRepository.findAll();
        let totalProducts = 0;

        for(const product of result){
            totalProducts += product.getQuantity();
        }

        return totalProducts;
    }
}