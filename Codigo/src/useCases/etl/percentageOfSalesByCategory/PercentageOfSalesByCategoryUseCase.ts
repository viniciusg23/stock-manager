import { Product } from "../../../entities/Product";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";

export class PercentageOfSalesByCategoryUseCase {
    private saleRepository: ISaleRepository;

    public constructor(saleRepository: ISaleRepository){
        this.saleRepository = saleRepository;
    }

    public async execute(): Promise<Map<string, number>> {
        const allSales = await this.saleRepository.findAllLast30Days();

        const result = new Map<string, number>();
        let totalSales = 0;

        for(const sale of allSales){
            const product: Product | null = sale.getProduct();
            if(!product) break;

            const categoryName: string | undefined = product.getCategory()?.getName();
            if(!categoryName) break;

            if(!result.has(categoryName)){
                result.set(categoryName, 0);
            }

            result.set(categoryName, result.get(categoryName)! + sale.getQuantity());
            totalSales += sale.getQuantity();
        }

        for(const [category, value] of result){
            const percentage = value / totalSales;
            result.set(category, percentage);
        }

        return result;
    }
}