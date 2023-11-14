import mongoose from "mongoose";
import { beforeAll, afterAll, describe, test, expect } from "vitest";
import {connect, disconnect} from "../../../../config/db";
import { IProductRepository } from "../../../repository/productRepository/IProductRepository";
import { MongoDBProductRepository } from "../../../repository/productRepository/implementation/MongoDBProductRepository";
import { CreateProductUseCase } from "./CreateProductUseCase";
import { ICreateProductRequestDTO } from "./CreateProductDTO";
import { ICategoryRepository } from "../../../repository/categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../../repository/categoryRepository/implementation/MongoDBCategoryRepository";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../../repository/supplierRepository/implementation/MongoDBSupplierRepository";


beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await mongoose.connection.db.collection("products").drop();
    await disconnect();
})


test("create Product test", async () => {
    const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();
    const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
    const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);
    
    const createProductUseCase: CreateProductUseCase = new CreateProductUseCase(productRepository, categoryRepository, supplierRepository);

    const prod: ICreateProductRequestDTO = {
        isFiscal: true,
        category: "Camisa",
        name: "Camisa do Free Fire",
        quantity: 20,
        costPrice: 50,
        salePrice: 100,
        purchaseMonth: 5,
        purchaseYear: 2023,
        supplier: "supplier 1"
    }

    await createProductUseCase.execute(prod);

    const findedProduct = await productRepository.findByName("Camisa do Free Fire");

    expect(findedProduct).not.toBeNull();
    expect(findedProduct!.getName()).toBe("Camisa do Free Fire");
});
