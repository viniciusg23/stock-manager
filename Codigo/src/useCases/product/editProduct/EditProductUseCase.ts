import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { IEditProductDTO } from "./IEditProductDTO";

export class EditProductUseCase {
    private productRepository: IProductRepository;

    public constructor(productRepository: IProductRepository){
        this.productRepository = productRepository;
    }

    public async execute(data: IEditProductDTO){

    }
}