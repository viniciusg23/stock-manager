import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { MongoDBEmployeeRepository } from "../../../repository/employeeRepository/implementation/MongoDBEmployeeRepository";
import { ViewEmployeeController } from "./ViewEmployeeController";
import { ViewEmployeeUseCase } from "./ViewEmployeeUseCase";

const employeeRepository: IEmployeeRepository = new MongoDBEmployeeRepository();

const viewEmployeeUseCase: ViewEmployeeUseCase = new ViewEmployeeUseCase(employeeRepository);

const viewEmployeeController: ViewEmployeeController = new ViewEmployeeController(viewEmployeeUseCase);

export {viewEmployeeUseCase, viewEmployeeController};