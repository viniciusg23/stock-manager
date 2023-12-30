import { Employee } from "../../entities/Employee";
import { IRepository } from "../IRepository";

export interface IEmployeeRepository extends IRepository<Employee> {
    findByName(name: string): Promise<Employee | null>;
}