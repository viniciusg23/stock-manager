import { Sale } from "../../../entities/sale/Sale";
import { SaleModel } from "../../../models/Sale";
import { ISaleRepository } from "../ISaleRepository";

export class MongoDBSaleRepository implements ISaleRepository {

    async create(sale: Sale): Promise<void> {
        await SaleModel.create(sale);
    }
    
}