import { Sale } from "../../../entities/Sale";
import { EnumMonth } from "../../../entities/Product";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";
import { EditProductUseCase } from "../../product/editProduct/EditProductUseCase";
import { ISellProductDTO } from "./ISellProductDTO";
import { IEmployeeRepository } from "../../../repository/employeeRepository/IEmployeeRepository";

export class SellProductUseCase {
    private saleRepository: ISaleRepository;
    private productRepository: IProductRepository;
    private employeeRepository: IEmployeeRepository;
    private editProductUseCase: EditProductUseCase;

    public constructor(saleRepository: ISaleRepository, productRepository: IProductRepository, employeeRepository: IEmployeeRepository, editProductUseCase: EditProductUseCase){
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.employeeRepository = employeeRepository;
        this.editProductUseCase = editProductUseCase;
    }

    public async execute(data: ISellProductDTO){
        const totalPrice = data.quantity * data.salePrice;
        const sale = new Sale(
            await this.productRepository.findById(data.productId), 
            data.quantity, 
            data.salePrice, 
            await this.employeeRepository.findById(data.employeeId), 
            totalPrice, 
            data.buyerName, 
            data.buyerEmail, 
            data.buyerNumber
        );

        await this.saleRepository.create(sale);
        
        const product = await this.productRepository.findById(data.productId);
        if(!product){
            throw new Error("Was not possibel decrement product quantity from Stock");
        }

        product.setQuantity(product.getQuantity() - data.quantity);
        const productId = product.getId();

        if(!productId){
            throw new Error("Cannot resolve product id.");
        }


        await this.editProductUseCase.execute({
            isFiscal: product.isIsFiscal(),
            id: productId,
            category: product.getCategory()?.getId() ? product.getCategory()!.getId()! : "null",
            name: product.getName(),
            quantity: product.getQuantity(),
            costPrice: product.getCostPrice(),
            salePrice: product.getSalePrice(),
            purchaseMonth: EnumMonth[product.getPurchaseMonth()],
            purchaseYear: product.getPurchaseYear(),
            supplier: product.getSupplier()?.getId() ? product.getSupplier()!.getId()! : "null",
            code: product.getCode()
        });


    }
}