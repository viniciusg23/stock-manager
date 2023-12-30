import { User } from "../../entities/User";

export interface IUserRepository {
    create(user: User): Promise<void>;
    findByName(name: string): Promise<User | null>;
}