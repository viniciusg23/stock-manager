import { Supplier } from "../../../entities/supplier/Supplier";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { IRemoveSupplierRequestDTO } from "./RemoveSupplierDTO";

export class RemoveSupplierUseCase {
  // Note the capitalization of the class name
  private supplierRepository: ISupplierRepository;

  constructor(supplierRepository: ISupplierRepository) {
    this.supplierRepository = supplierRepository;
  }

  public async execute(data: IRemoveSupplierRequestDTO) {
    await this.supplierRepository.remove(data.name);
  }
}
