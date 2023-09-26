import { IUserRepository } from "../../repository/userRepository/IUserRepository";
import { MongoDBUserRepository } from "../../repository/userRepository/implementation/MongoDBUserRepository";
import { Controller } from "../IController";
import { RegisterController } from "./RegisterController";
import { RegisterUseCase } from "./RegisterUseCase";

const userRepository: IUserRepository = new MongoDBUserRepository();

const registerUseCase: RegisterUseCase = new RegisterUseCase(userRepository);

const registerController: Controller = new RegisterController(registerUseCase);

export {registerUseCase, registerController};