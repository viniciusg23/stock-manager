import { Supplier } from "../../entities/Supplier";
import { ISupplierRepository } from "../ISupplierRepository";

export class MongoDBSupplierRepository implements ISupplierRepository {



    findByName(name: string): Promise<Supplier> {
        throw new Error("Method not implemented.");
    }


    save(supplier: Supplier): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
    remove(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}