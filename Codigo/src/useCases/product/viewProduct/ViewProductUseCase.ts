import { getMonthValue } from "../../../entities/product/EnumMonth";
import { Product } from "../../../entities/product/Product";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";

export class ViewProductUseCase {
    private productRepository: IProductRepository;

    constructor(productRepository: IProductRepository){
        this.productRepository = productRepository;
    }

    public async execute(): Promise<Product[]> {
        const allProducts = [];
        const productsDB = await this.productRepository.findAll();

        for(const prod of productsDB){
            allProducts.push(new Product(
                prod.isIsFiscal(),
                prod.getCategory(),
                prod.getName(),
                prod.getQuantity(),
                prod.getCostPrice(),
                prod.getSalePrice(),
                getMonthValue(prod.getPurchaseMonth())!,
                prod.getPurchaseYear(),
                prod.getSupplier(),
                prod.getCode()
            ));
        }

        return allProducts;
    }
}