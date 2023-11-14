import { Category } from "./Category";
import { Supplier } from "./Supplier";

export class Product {
    [key: string]: any;
    public code: string;
    public isFiscal: boolean;
    public category: Category | null;
    public name: string;
    public quantity: number;
    public costPrice: number;
    public salePrice: number;
    public purchaseMonth:
      | "Janeiro"
      | "Fevereiro"
      | "Marco"
      | "Abril"
      | "Maio"
      | "Junho"
      | "Julho"
      | "Agosto"
      | "Setembro"
      | "Outubro"
      | "Novembro"
      | "Dezembro";
    public purchaseYear: number;
    public supplier: Supplier | null;
    public id?: string;
  
    constructor(
      isFiscal: boolean,
      category: Category | null,
      name: string,
      quantity: number,
      costPrice: number,
      salePrice: number,
      purchaseMonth: number,
      purchaseYear: number,
      supplier: Supplier | null,
      code?: string,
      id?: string
    ) {
      this.code = code ? code : "";
  
      this.isFiscal = isFiscal;
      this.category = category;
      this.name = name;
  
      if (quantity < 0) {
        throw new Error("Quantity of product can not negative.");
      }
      this.quantity = quantity;
      this.costPrice = costPrice;
      this.salePrice = salePrice;
  
      if (purchaseMonth > 12 && purchaseMonth < 1) {
        throw new Error("Invalid urchase month.");
      }
      this.purchaseMonth = EnumMonth[purchaseMonth] as
        | "Janeiro"
        | "Fevereiro"
        | "Marco"
        | "Abril"
        | "Maio"
        | "Junho"
        | "Julho"
        | "Agosto"
        | "Setembro"
        | "Outubro"
        | "Novembro"
        | "Dezembro";
  
      this.purchaseYear = purchaseYear;
      this.supplier = supplier;
      this.id = id;
    }

}


export enum EnumMonth {
    Janeiro = 1,
    Fevereiro,
    Marco,
    Abril,
    Maio,
    Junho,
    Julho,
    Agosto,
    Setembro,
    Outubro,
    Novembro,
    Dezembro,
}

export function getMonthValue(month: keyof typeof EnumMonth): number | undefined {
    return EnumMonth[month];
}