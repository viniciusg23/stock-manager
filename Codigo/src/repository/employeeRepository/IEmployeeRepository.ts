import { Employee } from "../../entities/Employee";

export interface IEmployeeRepository {
    findByName(name: string): Promise<Employee | null>;
    remove(id: string): Promise<void>;
    create(employee: Employee): Promise<void>;
    findAll(): Promise<Employee[]>
}