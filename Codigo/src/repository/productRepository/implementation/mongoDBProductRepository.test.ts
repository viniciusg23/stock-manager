import mongoose from "mongoose";
import { beforeAll, afterAll, describe, expect, test } from "vitest";
import { connect, disconnect } from "../../../../config/db";
import { MongoDBProductRepository } from "./MongoDBProductRepository";
import { Product } from "../../../entities/Product";
import { Category } from "../../../entities/Category";
import { Supplier } from "../../../entities/Supplier";
import { ICategoryRepository } from "../../categoryRepository/ICategoryRepository";
import { MongoDBCategoryRepository } from "../../categoryRepository/implementation/MongoDBCategoryRepository";
import { ISupplierRepository } from "../../supplierRepository/ISupplierRepository";
import { MongoDBSupplierRepository } from "../../supplierRepository/implementation/MongoDBSupplierRepository";
import { IProductRepository } from "../IProductRepository";


beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await mongoose.connection.db.collection("products").drop();
    await disconnect();
})


describe("manage products in database", () => {
    test("create product", async () => {
        const categoryRepository: ICategoryRepository = new MongoDBCategoryRepository();
        const supplierRepository: ISupplierRepository = new MongoDBSupplierRepository();
        const productRepository: IProductRepository = new MongoDBProductRepository(supplierRepository, categoryRepository);
        const product = new Product(
            true,
            new Category("Camisa", "12,232,23"),
            "Camisa do Bob Esponja",
            100,
            40,
            60,
            4,
            2023,
            new Supplier("Alice", "Sem descrição"),
            "1"
        );

        await productRepository.create(product);
        
        const findProduct = await productRepository.findByCode("1");

        expect(findProduct).not.toBeNull();
        expect(findProduct!.getName()).toBe("Camisa do Bob Esponja");
    })
});