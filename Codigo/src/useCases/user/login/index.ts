import { IUserRepository } from "../../../repository/userRepository/IUserRepository";
import { MongoDBUserRepository } from "../../../repository/userRepository/implementation/MongoDBUserRepository";
import { IController } from "../../IController";
import { LoginController } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";


const userRepository: IUserRepository = new MongoDBUserRepository();

const loginUseCase: LoginUseCase = new LoginUseCase(userRepository);

const loginController: IController = new LoginController(loginUseCase);

export {loginUseCase, loginController};