import { Product } from "../../entities/Product";
import { IRepository } from "../IRepository";

export interface IProductRepository extends IRepository<Product>{
    findByName(name: string): Promise<Product | null>;
    findByCode(code: string): Promise<Product | null>;
    update(id: string, product: Product): Promise<void>;
}