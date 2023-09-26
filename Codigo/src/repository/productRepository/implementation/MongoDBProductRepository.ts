import { EnumMonth, getMonthValue } from "../../../entities/product/EnumMonth";
import { Product } from "../../../entities/product/Product";
import { ProductModel } from "../../../models/Product";
import { IProductRepository } from "../IProductRepository";

export class MongoDBProductRepository implements IProductRepository {

    async findByName(name: string): Promise<Product | null> {
        const findProduct = await ProductModel.findOne({name: name});

        if(!findProduct){
            return null;
        }

        return new Product(
            findProduct.isFiscal,
            findProduct.category,
            findProduct.name,
            findProduct.quantity,
            findProduct.costPrice,
            findProduct.salePrice,
            getMonthValue(findProduct.purchaseMonth)!,
            findProduct.purchaseYear,
            findProduct.supplier,
            findProduct.code
        );
    }
    async findByCode(code: string): Promise<Product | null> {
        // throw new Error("Method not implemented.");

        const findProduct = await ProductModel.findOne({code: code});

        if(!findProduct){
            return null;
        }

        return new Product(
            findProduct.isFiscal,
            findProduct.category,
            findProduct.name,
            findProduct.quantity,
            findProduct.costPrice,
            findProduct.salePrice,
            getMonthValue(findProduct.purchaseMonth)!,
            findProduct.purchaseYear,
            findProduct.supplier,
            findProduct.code
        );

    }
    async create(product: Product): Promise<void> {
        await ProductModel.create(product);
    }
    async remove(code: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async findAll(): Promise<Product[]> {
        const allProducts = [];
        const allProductsDB = await ProductModel.find();

        for(const findProduct of allProductsDB) {
            allProducts.push(new Product(
                findProduct.isFiscal,
                findProduct.category,
                findProduct.name,
                findProduct.quantity,
                findProduct.costPrice,
                findProduct.salePrice,
                getMonthValue(findProduct.purchaseMonth)!,
                findProduct.purchaseYear,
                findProduct.supplier,
                findProduct.code
            ));
        }

        return allProducts;
    }
    
}