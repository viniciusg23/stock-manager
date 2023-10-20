import { EnumMonth } from "./EnumMonth";

export class Product {
  private code: string;
  private isFiscal: boolean;
  private category: string;
  private name: string;
  private quantity: number;
  private costPrice: number;
  private salePrice: number;
  private purchaseMonth:
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
  private purchaseYear: number;
  private supplier: string;
  private id?: string;

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

  public getCode(): string {
    return this.code;
  }

  public setCode(code: string): void {
    this.code = code;
  }

  public isIsFiscal(): boolean {
    return this.isFiscal;
  }

  public setIsFiscal(isFiscal: boolean): void {
    this.isFiscal = isFiscal;
  }

  public getCategory(): string {
    return this.category;
  }

  public setCategory(category: string): void {
    this.category = category;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
  }

  public getQuantity(): number {
    return this.quantity;
  }

  public setQuantity(quantity: number): void {
    this.quantity = quantity;
  }

  public getCostPrice(): number {
    return this.costPrice;
  }

  public setCostPrice(costPrice: number): void {
    this.costPrice = costPrice;
  }

  public getSalePrice(): number {
    return this.salePrice;
  }

  public setSalePrice(salePrice: number): void {
    this.salePrice = salePrice;
  }

  public getPurchaseMonth():
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
    | "Dezembro" {
    return this.purchaseMonth;
  }

  public setPurchaseMonth(purchaseMonth: number): void {
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
  }

  public getPurchaseYear(): number {
    return this.purchaseYear;
  }

  public setPurchaseYear(purchaseYear: number): void {
    this.purchaseYear = purchaseYear;
  }

  public getSupplier(): string {
    return this.supplier;
  }

  public setSupplier(supplier: string): void {
    this.supplier = supplier;
  }

  public getId(): string | undefined{
    return this.id;
  }

}
