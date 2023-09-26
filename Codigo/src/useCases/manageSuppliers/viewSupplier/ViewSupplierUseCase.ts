import { Supplier } from "../../../entities/supplier/Supplier";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";

export class ViewSupplierUseCase {
    private supplierRepository: ISupplierRepository;
    
    constructor(supplierRepository: ISupplierRepository){
        this.supplierRepository = supplierRepository;
    }
    
    async execute(): Promise<Supplier[]>{
        const allSuppliers = await this.supplierRepository.findAll();

        return allSuppliers;
    }
}