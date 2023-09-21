import { Supplier } from "../../../entities/Supplier";
import { ISupplierRepository } from "../../../repository/ISupplierRepository";
import { ICreateSupplierRequestDTO } from "./CreateSupplierDTO";

export class CreateSupplierUseCase {
    private supplierRepository: ISupplierRepository;
    
    constructor(supplierRepository: ISupplierRepository){
        this.supplierRepository = supplierRepository;
    }
    
    async execute(data: ICreateSupplierRequestDTO){
        const supplierAlreadyExists = await this.supplierRepository.findByName(data.name);

        if(supplierAlreadyExists){
            throw new Error("Supplier Already exists.");
        }

        const supplier = new Supplier(data.name, data.description);

        await this.supplierRepository.save(supplier);

    }
}