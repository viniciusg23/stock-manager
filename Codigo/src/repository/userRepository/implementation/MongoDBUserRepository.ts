import { User } from "../../../entities/user/User";
import { UserModel } from "../../../models/User";
import { IUserRepository } from "../IUserRepository";

export class MongoDBUserRepository implements IUserRepository {

    async create(user: User): Promise<void> {
        
        await UserModel.create({name: user.getName(), password: user.getPassword()});
        
    }

    async findByName(name: string): Promise<User | null> {
        const userDB = await UserModel.findOne({name: name});

        if(!userDB){
            return null;
        }

        const user = new User(userDB.name, userDB.password);
        return user;
    }
    
}