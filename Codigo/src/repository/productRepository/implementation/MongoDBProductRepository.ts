import { Product, getMonthValue } from "../../../entities/Product";
import { ProductModel } from "../../../models/Product";
import { ICategoryRepository } from "../../categoryRepository/ICategoryRepository";
import { ISupplierRepository } from "../../supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../supplierRepository/implementation/MongoDBSupplierRepository";
import { IProductRepository } from "../IProductRepository";

export class MongoDBProductRepository implements IProductRepository {
    private supplierRepository: ISupplierRepository;
    private categoryRepository: ICategoryRepository;

    public constructor(supplierRepository: ISupplierRepository, categoryRepository: ICategoryRepository){
        this.supplierRepository = supplierRepository;
        this.categoryRepository = categoryRepository;
    }

    async findByName(name: string): Promise<Product | null> {
        const findProduct = await ProductModel.findOne({name: name});

        if(!findProduct){
            return null;
        }

        return new Product(
            findProduct.isFiscal,
            await this.categoryRepository.findById(findProduct.category),
            findProduct.name,
            findProduct.quantity,
            findProduct.costPrice,
            findProduct.salePrice,
            getMonthValue(findProduct.purchaseMonth)!,
            findProduct.purchaseYear,
            await this.supplierRepository.findById(findProduct.supplier),
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
            await this.categoryRepository.findById(findProduct.category),
            findProduct.name,
            findProduct.quantity,
            findProduct.costPrice,
            findProduct.salePrice,
            getMonthValue(findProduct.purchaseMonth)!,
            findProduct.purchaseYear,
            await this.supplierRepository.findById(findProduct.supplier),
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
            await this.categoryRepository.findById(findProduct.category),
            findProduct.name,
            findProduct.quantity,
            findProduct.costPrice,
            findProduct.salePrice,
            getMonthValue(findProduct.purchaseMonth)!,
            findProduct.purchaseYear,
            await this.supplierRepository.findById(findProduct.supplier),
            findProduct.code,
            findProduct._id.toString()
        );
    }
    
    async create(product: Product): Promise<void> {
        await ProductModel.create({
            name: product.getName(),
            code: product.getCode(),
            isFiscal: product.isIsFiscal(),
            category: product.getCategory()?.getId(),
            quantity: product.getQuantity(),
            costPrice: product.getCostPrice(),
            salePrice: product.getSalePrice(),
            purchaseMonth: product.getPurchaseMonth(),
            purchaseYear: product.getPurchaseYear(),
            supplier: product.getSupplier()?.getId()
        });
    }

    async remove(id: string): Promise<void> {
        const product = await ProductModel.deleteOne({_id: id});

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
                await this.categoryRepository.findById(findProduct.category),
                findProduct.name,
                findProduct.quantity,
                findProduct.costPrice,
                findProduct.salePrice,
                getMonthValue(findProduct.purchaseMonth)!,
                findProduct.purchaseYear,
                await this.supplierRepository.findById(findProduct.supplier),
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
        findedProduct.category = product.getCategory()!.getId()!;
        findedProduct.name = product.getName();
        findedProduct.quantity = product.getQuantity();
        findedProduct.costPrice = product.getCostPrice();
        findedProduct.salePrice = product.getSalePrice();
        findedProduct.purchaseMonth = product.getPurchaseMonth();
        findedProduct.purchaseYear = product.getPurchaseYear();
        findedProduct.supplier = product.getSupplier()!.getId()!;


        await findedProduct.save();
    }
    
}