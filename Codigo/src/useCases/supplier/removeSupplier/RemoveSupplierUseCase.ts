import { Supplier } from "../../../entities/Supplier";
import { ISupplierRepository } from "../../../repository/supplierRepository/ISupplierRepository";
import { IRemoveSupplierRequestDTO } from "./RemoveSupplierDTO";

export class RemoveSupplierUseCase {
  private supplierRepository: ISupplierRepository;

  constructor(supplierRepository: ISupplierRepository) {
      this.supplierRepository = supplierRepository;
  }

  public async execute(data: IRemoveSupplierRequestDTO) {
      await this.supplierRepository.remove(data);
  }
}
