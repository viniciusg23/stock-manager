import config from "config";
import { User } from "../../../entities/User";
import { IUserRepository } from "../../../repository/userRepository/IUserRepository";
import { IRegisterDTO } from "./RegisterDTO";
import { hashSync } from "bcryptjs";


export class RegisterUseCase {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public async execute(data: IRegisterDTO): Promise<void> {
        const verifyUser = await this.userRepository.findByName(data.name);

        if(verifyUser){
            throw new Error("User already exists.");
        }

        if(data.systemPassword !== config.get<string>("systemPassword")){
            throw new Error("Invalid System Passsword");
        }

        const hashedPassword = hashSync(data.password, 10);

        const user = new User(data.name, hashedPassword);

        await this.userRepository.create(user);
    }
}