import { Category } from "../../entities/Category";
import { IRepository } from "../IRepository";

export interface ICategoryRepository extends IRepository<Category>{
    findByName(name: string): Promise<Category | null>;
}