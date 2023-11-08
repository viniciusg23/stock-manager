import { Sale } from "../../entities/Sale";

export interface ISaleRepository {
    create(sale: Sale): Promise<void>;
    findAll(): Promise<Sale[]>;
    findAllLast30Days(): Promise<Sale[]>;
}