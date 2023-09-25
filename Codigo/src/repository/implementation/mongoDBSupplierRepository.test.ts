import {afterAll, beforeAll, beforeEach, describe, expect, test} from "vitest";
import { SupplierModel } from "../../models/Supplier";
import { MongoDBSupplierRepository } from "./MongoDBSupplierRepository";
import { connect, disconnect } from "../../../config/db";
import { Supplier } from "../../entities/Supplier";
import mongoose from "mongoose";

const testName: string = "supplier1";

beforeAll(async () => {
    await connect();
});

afterAll(async () => {
    await mongoose.connection.db.collection("suppliers").drop();
    await disconnect();
})


describe("Manage Supplier in Database", () => {
    

    test("create Supplier in database", async () => {
        const supplier = new Supplier(testName, "desc1");
        const mongoDBSupplierRepository = new MongoDBSupplierRepository();

        await mongoDBSupplierRepository.save(supplier);

        const verifySupplier = await SupplierModel.findOne({name: testName});

        expect(verifySupplier).not.toBeNull();
        expect(verifySupplier!.name).toBe(testName);
    });


    test("find Supplier by name in dataBase", async () => {
        await SupplierModel.create({name: testName, description: "desc1"});

        const mongoDBSupplierRepository = new MongoDBSupplierRepository();
        const findedSupplier = await mongoDBSupplierRepository.findByName(testName);
       
        expect(findedSupplier).not.toBeNull();

        expect(findedSupplier!.getName).toBe(testName);
    });

    test("delete supplir by name in database", async () => {
        const supplier = new Supplier("supplier2", "desc1");
        const mongoDBSupplierRepository = new MongoDBSupplierRepository();

        await mongoDBSupplierRepository.save(supplier);

        await mongoDBSupplierRepository.remove("supplier2");
        const findedSupplier = await mongoDBSupplierRepository.findByName("supplier2");

        expect(findedSupplier).toBeNull();
    })

})