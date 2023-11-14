export interface IRepository<T> {
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    create(entitie: T): Promise<void>;
    remove(id: string): Promise<void>;
}