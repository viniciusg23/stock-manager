import { Supplier } from "../../entities/Supplier";
import { IRepository } from "../IRepository";

/**
 * methods to interect with the database
 */
export interface ISupplierRepository extends IRepository<Supplier>{
    findByName(name: string): Promise<Supplier | null>;
}