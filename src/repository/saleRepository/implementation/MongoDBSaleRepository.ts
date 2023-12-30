import { Sale } from "../../../entities/Sale";
import { SaleModel } from "../../../models/Sale";
import { IEmployeeRepository } from "../../employeeRepository/IEmployeeRepository";
import { IProductRepository } from "../../productRepository/IProductRepository";
import { ISaleRepository } from "../ISaleRepository";

export class MongoDBSaleRepository implements ISaleRepository {
    private productRepository: IProductRepository;
    private employeeRepository: IEmployeeRepository;

    public constructor(productRepository: IProductRepository, employeeRepository: IEmployeeRepository){
        this.productRepository = productRepository;
        this.employeeRepository = employeeRepository
    }

    //TODO
    findById(id: string): Promise<Sale | null> {
        throw new Error("Method not implemented.");
    }
    remove(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async create(sale: Sale): Promise<void> {
        await SaleModel.create({
            productId: sale.getProduct()!.getId()!,
            quantity: sale.getQuantity(),
            salePrice: sale.getSalePrice(),
            totalPrice: sale.getTotalPrice(),
            employeeId: sale.getEmployee()!.getId()!,
            buyerName: sale.getBuyerName(),
            buyerEmail: sale.getBuyerEmail() ? sale.getBuyerEmail() : null,
            buyerNumber: sale.getBuyerNumber() ? sale.getBuyerNumber() : null
        });
    }

    async findAll(): Promise<Sale[]> {
        const allSales: Sale[] = [];
        const allSalesDB = await SaleModel.find();
        
        for(const sale of allSalesDB){
            allSales.push(new Sale(
                await this.productRepository.findById(sale.productId),
                sale.quantity,
                sale.salePrice,
                await this.employeeRepository.findById(sale.employeeId),
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
                await this.productRepository.findById(sale.productId),
                sale.quantity,
                sale.salePrice,
                await this.employeeRepository.findById(sale.employeeId),
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