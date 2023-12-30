import { Sale } from "../../entities/Sale";
import { IRepository } from "../IRepository";

export interface ISaleRepository extends IRepository<Sale>{
    findAllLast30Days(): Promise<Sale[]>;
}