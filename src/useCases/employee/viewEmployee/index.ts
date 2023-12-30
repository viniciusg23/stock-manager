import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { MongoDBEmployeeRepository } from "../../../repository/employeeRepository/implementation/MongoDBEmployeeRepository";
import { IController } from "../../IController";
import { ViewEmployeeController } from "./ViewEmployeeController";
import { ViewEmployeeUseCase } from "./ViewEmployeeUseCase";

const employeeRepository: IEmployeeRepository = new MongoDBEmployeeRepository();

const viewEmployeeUseCase: ViewEmployeeUseCase = new ViewEmployeeUseCase(employeeRepository);

const viewEmployeeController: IController = new ViewEmployeeController(viewEmployeeUseCase);

export {viewEmployeeUseCase, viewEmployeeController};