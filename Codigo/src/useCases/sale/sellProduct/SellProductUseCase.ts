import { Sale } from "../../../entities/Sale/Sale";
import { EnumMonth } from "../../../entities/product/EnumMonth";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { ISaleRepository } from "../../../repository/saleRepository/ISaleRepository";
import { EditProductUseCase } from "../../product/editProduct/EditProductUseCase";
import { ISellProductDTO } from "./ISellProductDTO";

export class SellProductUseCase {
    private saleRepository: ISaleRepository;
    private productRepository: IProductRepository;
    private editProductUseCase: EditProductUseCase;

    public constructor(saleRepository: ISaleRepository, productRepository: IProductRepository, editProductUseCase: EditProductUseCase){
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.editProductUseCase = editProductUseCase;
    }

    public async execute(data: ISellProductDTO){
        const totalPrice = data.quantity * data.salePrice;
        const sale = new Sale(data.productId, data.quantity, data.salePrice, data.employeeId, totalPrice);
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
            category: product.getCategory(),
            name: product.getName(),
            quantity: product.getQuantity(),
            costPrice: product.getCostPrice(),
            salePrice: product.getSalePrice(),
            purchaseMonth: EnumMonth[product.getPurchaseMonth()],
            purchaseYear: product.getPurchaseYear(),
            supplier: product.getSupplier(),
            code: product.getCode()
        });


    }
}