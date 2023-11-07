import { Supplier } from "../../../entities/Supplier";
import { ISupplierRepository } from "../ISupplierRepository";
import { SupplierModel } from "../../../models/Supplier";

export class MongoDBSupplierRepository implements ISupplierRepository {

    async findByName(name: string): Promise<Supplier | null> {
        const dbResult = await SupplierModel.findOne({name: name});

        if(!dbResult){
            return null;
        }

        return new Supplier(dbResult.name, dbResult.description, dbResult._id.toString());
    }


    async create(supplier: Supplier): Promise<void> { 
        if(!supplier.getName()){
            return;
        }

        await SupplierModel.create({name: supplier.getName(), description: supplier.getDescription()});
    }

    
    async remove(id: string): Promise<void> {
        const deletedSupplier = await SupplierModel.deleteOne({_id: id});

        if(!deletedSupplier){
            throw new Error("Was not possible to delete this Supplier");
        }
    }

    public async findAll(): Promise<Supplier[]> {
        const allSuppliers = [];
        const allSuppliersDB = await SupplierModel.find();
        for(const sup of allSuppliersDB){
            allSuppliers.push(new Supplier(sup.name, sup.description, sup._id.toString()));
        }

        return allSuppliers;
    }
    
}