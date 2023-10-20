import { Employee } from "../../../entities/employee/Employee";
import { EmployeeModel } from "../../../models/Employee";
import { IEmployeeRepository } from "../IEmployeeRepository";

export class MongoDBEmployeeRepository implements IEmployeeRepository {
    
    async findByName(name: string): Promise<Employee | null> {
        const findedEmployee = await EmployeeModel.findOne({name: name});

        if(!findedEmployee){
            return null;
        }

        return new Employee(findedEmployee.name, findedEmployee.job, findedEmployee._id.toString());
    }
    async remove(id: string): Promise<void> {
        const deletedEmployee = await EmployeeModel.deleteOne({_id: id});

        if(!deletedEmployee){
            throw new Error("Was not possible to delete this employee");
        }
    }
    async create(employee: Employee): Promise<void> {
        await EmployeeModel.create({
            name: employee.getName(),
            job: employee.getJob()
        });
    }
    async findAll(): Promise<Employee[]> {
        const allEmployees: Employee[] = [];
        const allEmployeesDB = await EmployeeModel.find();

        for(const employee of allEmployeesDB){
            allEmployees.push(new Employee(employee.name, employee.job, employee._id.toString()));
        }

        return allEmployees;
    }
    
}