import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { IRemoveEmployeeDTO } from "./IRemoveEmployeeDTO";

export class RemoveEmployeeUseCase {
    private employeeRepository: IEmployeeRepository;

    public constructor(employeeRepository: IEmployeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public async execute(data: IRemoveEmployeeDTO): Promise<void> {
        await this.employeeRepository.remove(data);
    }
}