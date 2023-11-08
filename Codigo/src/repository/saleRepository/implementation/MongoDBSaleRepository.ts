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

    async findAll(): Promise<Sale[]> {
        const allSales: Sale[] = [];
        const allSalesDB = await SaleModel.find();
        
        for(const sale of allSalesDB){
            allSales.push(new Sale(
                sale.productId,
                Number(sale.quantity),
                sale.salePrice,
                sale.employeeId,
                sale.totalPrice,
                sale.buyerName,
                sale.buyerEmail,
                sale.buyerNumber,
                sale._id.toString()
            ));
        }

        return allSales;
    }

    async findAllLast30Days(): Promise<Sale[]> {
        const actualDate = new Date();
        const pastDate = new Date().setDate(actualDate.getDate() - 30);

        const result = await SaleModel.find({
            createdAt: {
                $gte: pastDate,
                $lte: actualDate
            }
        });

        const allSales: Sale[] = [];
        
        for(const sale of result){
            allSales.push(new Sale(
                sale.productId,
                Number(sale.quantity),
                sale.salePrice,
                sale.employeeId,
                sale.totalPrice,
                sale.buyerName,
                sale.buyerEmail,
                sale.buyerNumber,
                sale._id.toString()
            ));
        }

        return allSales;
    }
    
}