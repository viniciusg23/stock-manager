import { IUserRepository } from "../../repository/userRepository/IUserRepository";
import { MongoDBUserRepository } from "../../repository/userRepository/implementation/MongoDBUserRepository";
import { Controller } from "../IController";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";


const userRepository: IUserRepository = new MongoDBUserRepository();

const loginUseCase: LoginUseCase = new LoginUseCase(userRepository);

const loginController: Controller = new LoginController(loginUseCase);

export {loginUseCase, loginController};