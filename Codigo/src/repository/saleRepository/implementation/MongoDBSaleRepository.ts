import { Sale } from "../../../entities/Sale";
import { SaleModel } from "../../../models/Sale";
import { ISaleRepository } from "../ISaleRepository";

export class MongoDBSaleRepository implements ISaleRepository {

    async create(sale: Sale): Promise<void> {
        await SaleModel.create({
            productId: sale.getProductId(),
            quantity: sale.getQuantity(),
            salePrice: sale.getSalePrice(),
            totalPrice: sale.getTotalPrice(),
            employeeId: sale.getEmployeeId(),
            buyerName: sale.getBuyerName(),
            buyerEmail: sale.getBuyerEmail() ? sale.getBuyerEmail() : undefined,
            buyerNumber: sale.getBuyerNumber() ? sale.getBuyerNumber() : undefined
        });
    }
    
}