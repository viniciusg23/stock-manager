import mongoose from "mongoose";
import { beforeAll, afterAll, describe, expect, test } from "vitest";
import { connect, disconnect } from "../../../../config/db";
import { MongoDBProductRepository } from "./MongoDBProductRepository";
import { Product } from "../../../entities/product/Product";


beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await mongoose.connection.db.collection("products").drop();
    await disconnect();
})


describe("manage products in database", () => {
    test("create product", async () => {
        const mongoDBSupplierRepository = new MongoDBProductRepository();
        const product = new Product(
            true,
            "Camisa",
            "Camisa do Bob Esponja",
            100,
            40,
            60,
            4,
            2023,
            "supplier 1",
            "1"
        );

        await mongoDBSupplierRepository.create(product);
        
        const findProduct = await mongoDBSupplierRepository.findByCode("1");

        expect(findProduct).not.toBeNull();
        expect(findProduct!.getName()).toBe("Camisa do Bob Esponja");
    })
});