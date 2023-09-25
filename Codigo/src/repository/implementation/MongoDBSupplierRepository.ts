import { Supplier } from "../../entities/Supplier";
import { ISupplierRepository } from "../ISupplierRepository";
import { SupplierModel } from "../../models/Supplier";

export class MongoDBSupplierRepository implements ISupplierRepository {

    async findByName(name: string): Promise<Supplier | null> {
        const dbResult = await SupplierModel.findOne({name: name});

        if(!dbResult){
            return null;
        }

        return new Supplier(dbResult.name, dbResult.description);
    }


    async save(supplier: Supplier): Promise<void> { 
        if(!supplier.getName){
            return;
        }

        await SupplierModel.create({name: supplier.getName, description: supplier.getDescription});
    }

    
    async remove(name: string): Promise<void> {
        if(!name){
            return;
        }

        await SupplierModel.deleteOne({name: name})
        return;
    }

    public async findAll(): Promise<Supplier[]> {
        const allSuppliers = [];
        const allSuppliersDB = await SupplierModel.find();
        for(const sup of allSuppliersDB){
            allSuppliers.push(new Supplier(sup.name, sup.description));
        }

        return allSuppliers;
    }
    
}