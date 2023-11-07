import { Employee } from "../../../entities/Employee";
import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";

export class ViewEmployeeUseCase {
    private employeeRepository: IEmployeeRepository;

    public constructor(employeeRepository: IEmployeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public async execute(): Promise<Employee[]> {
        const allEmployees: Employee[] = await this.employeeRepository.findAll();

        return allEmployees;
    }
}