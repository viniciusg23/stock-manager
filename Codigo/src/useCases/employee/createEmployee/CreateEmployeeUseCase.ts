import { Employee } from "../../../entities/employee/Employee";
import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { ICreateEmployeeDTO } from "./ICreateEmployeeDTO";

export class CreateEmployeeUseCase {
    private employeeRepository: IEmployeeRepository;

    public constructor(employeeRepository: IEmployeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public async execute(data: ICreateEmployeeDTO){
        const {name, job} = data;

        const verifyEmployee = await this.employeeRepository.findByName(name);

        if(verifyEmployee){
            throw new Error("Emplyee already exists.");
        }

        const employee = new Employee(name, job);
        await this.employeeRepository.create(employee);
    }
}