import { Sale } from "../../../entities/Sale";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";

export class ViewSaleUseCase {
    private saleRepository: ISaleRepository;

    public constructor(saleRepository: ISaleRepository){
        this.saleRepository = saleRepository;
    }

    public async execute(): Promise<Sale[]>{

        const allSales: Sale[] = [...await this.saleRepository.findAll()];

        return allSales;
        
    }
}