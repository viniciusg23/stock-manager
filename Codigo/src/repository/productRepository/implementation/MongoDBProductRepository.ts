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
            findProduct.code,
            findProduct._id.toString()
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
            findProduct.code,
            findProduct._id.toString()
        );

    }

    async findById(id: string): Promise<Product | null>{
        const findProduct = await ProductModel.findOne({_id: id});

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
            findProduct.code,
            findProduct._id.toString()
        );
    }

    async create(product: Product): Promise<void> {
        await ProductModel.create(product);
    }

    async remove(id: string): Promise<void> {

        console.log(id);
        const product = await ProductModel.deleteOne({_id: id});

        console.log(product);

        if(!product){
            throw new Error("Cannot remove this product");
        }

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
                findProduct.code,
                findProduct._id.toString()
            ));
        }

        return allProducts;
    }

    async update(id: string, product: Product): Promise<void>{
        const findedProduct = await ProductModel.findById(id);

        if(!findedProduct){
            throw new Error("Product not found.");
        }

        findedProduct.isFiscal = product.isIsFiscal();
        findedProduct.category = product.getCategory();
        findedProduct.name = product.getName();
        findedProduct.quantity = product.getQuantity();
        findedProduct.costPrice = product.getCostPrice();
        findedProduct.salePrice = product.getSalePrice();
        findedProduct.purchaseMonth = product.getPurchaseMonth();
        findedProduct.purchaseYear = product.getPurchaseYear();
        findedProduct.supplier = product.getSupplier();


        await findedProduct.save();
    }
    
}