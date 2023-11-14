import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";
import { MongoDBEmployeeRepository } from "../../../repository/employeeRepository/implementation/MongoDBEmployeeRepository";
import { IController } from "../../IController";
import { CreateEmployeeController } from "./CreateEmployeeController";
import { CreateEmployeeUseCase } from "./CreateEmployeeUseCase";

const employeeRepository: IEmployeeRepository = new MongoDBEmployeeRepository();

const createEmployeeUseCase: CreateEmployeeUseCase = new CreateEmployeeUseCase(employeeRepository);

const createEmployeeController: IController = new CreateEmployeeController(createEmployeeUseCase);

export {createEmployeeUseCase, createEmployeeController};