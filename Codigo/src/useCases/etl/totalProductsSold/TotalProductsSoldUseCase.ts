import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";

export class TotalProductsSoldUseCase {
    private saleRepository: ISaleRepository;

    public constructor(saleRepository: ISaleRepository){
        this.saleRepository = saleRepository;
    }

    public async execute(): Promise<number>{
        const allSales = await this.saleRepository.findAllLast30Days();

        return allSales.length
    }
}