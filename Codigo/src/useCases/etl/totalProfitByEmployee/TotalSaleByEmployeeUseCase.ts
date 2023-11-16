import { Employee } from "../../../entities/Employee";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";

export class TotalProfitByEmployeeUseCase {
    private saleRepository: ISaleRepository;

    public constructor(saleRepository: ISaleRepository){
        this.saleRepository = saleRepository;
    }

    public async execute(): Promise<Map<string, number>>{
        const allSales = await this.saleRepository.findAllLast30Days();

        const result = new Map<string, number>();

        for(const sale of allSales){
            const employee: Employee | null = sale.getEmployee();
            if(!employee) continue;

            const employeeName: string = employee.getName();
            if(!employeeName) continue;

            if(!result.has(employeeName)){
                result.set(employeeName, 0);
            }

            result.set(employeeName, result.get(employeeName)! + sale.getTotalPrice());
        }

        return result;
    }
}