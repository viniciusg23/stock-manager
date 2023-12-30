import { Product } from "../../../entities/Product";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { IRemoveProductRequestDTO } from "./RemoveProductDTO";

export class RemoveProductUseCase {
    private productRepository: IProductRepository;

    public constructor(productRepository: IProductRepository) {
        this.productRepository = productRepository;
    }

    public async execute(data: IRemoveProductRequestDTO) {
        await this.productRepository.remove(data.id);
    }
}
