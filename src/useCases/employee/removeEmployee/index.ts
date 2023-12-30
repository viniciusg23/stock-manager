import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { MongoDBEmployeeRepository } from "../../../repository/employeeRepository/implementation/MongoDBEmployeeRepository";
import { IController } from "../../IController";
import { RemoveEmployeeController } from "./RemoveEmployeeController";
import { RemoveEmployeeUseCase } from "./RemoveEmployeeUseCase";

const employeeRepository: IEmployeeRepository = new MongoDBEmployeeRepository();

const removeEmployeeUseCase: RemoveEmployeeUseCase = new RemoveEmployeeUseCase(employeeRepository);

const removeEmployeeController: IController = new RemoveEmployeeController(removeEmployeeUseCase);

export { removeEmployeeUseCase, removeEmployeeController };