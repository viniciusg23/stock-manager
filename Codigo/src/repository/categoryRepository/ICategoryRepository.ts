import { Category } from "../../entities/Category";

export interface ICategoryRepository {
    findByName(name: string): Promise<Category | null>;
    remove(id: string): Promise<void>;
    create(category: Category): Promise<void>;
    findAll(): Promise<Category[]>;
}