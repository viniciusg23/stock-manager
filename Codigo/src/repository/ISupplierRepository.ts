import { Supplier } from "../entities/Supplier";

/**
 * methods to interect with the database
 */
export interface ISupplierRepository {
    findByName(name: string): Promise<Supplier>;
    save(supplier: Supplier): Promise<void>;
    remove(name: string): Promise<void>;
}