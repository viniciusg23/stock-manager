import { Product } from "../../entities/product/Product";

export interface IProductRepository {
    findByName(name: string): Promise<Product | null>;
    findByCode(code: string): Promise<Product | null>;
    create(product: Product): Promise<void>;
    remove(code: string): Promise<void>;
    findAll(): Promise<Product[]>;
}