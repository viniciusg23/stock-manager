import { Sale } from "../../entities/sale/Sale";

export interface ISaleRepository {
    create(sale: Sale): Promise<void>;
}