import {afterAll, beforeAll, beforeEach, describe, expect, test} from "vitest";
import { SupplierModel } from "../../../models/Supplier";
import { MongoDBSupplierRepository } from "./MongoDBSupplierRepository";
import { connect, disconnect } from "../../../../config/db";
import { Supplier } from "../../../entities/supplier/Supplier";
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
        const supplier = new Supplier("sup1", "desc1");
        const mongoDBSupplierRepository = new MongoDBSupplierRepository();

        await mongoDBSupplierRepository.create(supplier);

        const verifySupplier = await SupplierModel.findOne({name: "sup1"});

        expect(verifySupplier).not.toBeNull();
        expect(verifySupplier!.name).toBe("sup1");
    });


    test("find Supplier by name in dataBase", async () => {
        await SupplierModel.create({name: "sup2", description: "desc1"});

        const mongoDBSupplierRepository = new MongoDBSupplierRepository();
        const findedSupplier = await mongoDBSupplierRepository.findByName("sup2");
       
        expect(findedSupplier).not.toBeNull();

        expect(findedSupplier!.getName()).toBe("sup2");
    });

    test("delete supplir by name in database", async () => {
        const supplier = new Supplier("sup3", "desc1");
        const mongoDBSupplierRepository = new MongoDBSupplierRepository();

        await mongoDBSupplierRepository.create(supplier);

        await mongoDBSupplierRepository.remove("sup3");
        const findedSupplier = await mongoDBSupplierRepository.findByName("sup3");

        expect(findedSupplier).toBeNull();
    })

})