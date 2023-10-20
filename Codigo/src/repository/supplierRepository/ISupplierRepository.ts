import { Supplier } from "../../entities/supplier/Supplier";

/**
 * methods to interect with the database
 */
export interface ISupplierRepository {
    findByName(name: string): Promise<Supplier | null>;
    create(supplier: Supplier): Promise<void>;
    remove(id: string): Promise<void>;
    findAll(): Promise<Supplier[]>;
}