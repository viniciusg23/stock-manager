export class Product {
    [key: string]: any;
    code: string;
    isFiscal: boolean;
    category: string;
    name: string;
    quantity: number;
    costPrice: number;
    salePrice: number;
    purchaseMonth:
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
    purchaseYear: number;
    supplier: string;
    id?: string;

    constructor(
        isFiscal: boolean,
        category: string,
        name: string,
        quantity: number,
        costPrice: number,
        salePrice: number,
        purchaseMonth: number,
        purchaseYear: number,
        supplier: string,
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