import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";

export class PercentageOfSalesByCategoryUseCase {
    private saleRepository: ISaleRepository;
    private productRepository: IProductRepository;
    private categoryRepository: ICategoryRepository;

    public constructor(saleRepository: ISaleRepository, productRepository: IProductRepository, categoryRepository: ICategoryRepository){
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public async execute(){
        const allSales = await this.saleRepository.findAllLast30Days();

        const allProducts = await this.productRepository.findAll();
        
    }
}