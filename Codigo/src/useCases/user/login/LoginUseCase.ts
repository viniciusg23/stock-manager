import { compareSync } from "bcryptjs";
import { IUserRepository } from "../../../repository/userRepository/IUserRepository";
import { ILoginDTO } from "./LoginDTO";
import jwt from "jsonwebtoken";
import config from "config";

export class LoginUseCase {
    private userRepository: IUserRepository;

    public constructor(userRepository: IUserRepository){
        this.userRepository = userRepository;
    }

    public async execute(data: ILoginDTO): Promise<string>{
        const verifyUser = await this.userRepository.findByName(data.name);

        if(!verifyUser){
            throw new Error("Name or password is wrong.");
        }

        const verifyPassword = compareSync(data.password, verifyUser.getPassword());

        if(!verifyPassword){
            throw new Error("Name or password is wrong.");
        }

        const jwtSecret = config.get<string>("jwt");
        const expires = 60 * 60 * 24 * 7;

        const token = jwt.sign({name: verifyUser.getName()}, jwtSecret, {expiresIn: expires});

        return token;
    }
}