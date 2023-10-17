import { Sale } from "../../entities/Sale/Sale";

export interface ISaleRepository {
    create(sale: Sale): Promise<void>;
}