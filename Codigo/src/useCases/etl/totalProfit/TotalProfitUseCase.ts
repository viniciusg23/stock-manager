import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";

export class TotalProfitUseCase {
    private saleRepository: ISaleRepository;

    public constructor(saleRepository: ISaleRepository){
        this.saleRepository = saleRepository;
    }

    public async execute(): Promise<number>{
        const allSales = await this.saleRepository.findAllLast30Days();

        const result = allSales.reduce((total, sale) => total += sale.getTotalPrice(), 0);

        return result;
    }

}