import { Supplier } from "../entities/Supplier";

/**
 * methods to interect with the database
 */
export interface ISupplierRepository {
    findByName(name: string): Promise<Supplier | null>;
    save(supplier: Supplier): Promise<void>;
    remove(name: string): Promise<void>;
    findAll(): Promise<Supplier[]>;
}