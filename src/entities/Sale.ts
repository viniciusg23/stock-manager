import { Employee } from "./Employee";
import { Product } from "./Product";

export class Sale {
    private product: Product | null;
    private quantity: number;
    private salePrice: number;
    private employee: Employee | null;
    private totalPrice: number;
    private buyerName: string;
    private id?: string;
    private buyerEmail?: string;
    private buyerNumber?: string;


    public constructor(
        product: Product | null,
        quantity: number,
        salePrice: number,
        employee: Employee | null,
        totalPrice: number,
        buyerName: string,
        buyerEmail?: string,
        buyerNumber?: string,
        id?: string
    ) {
        this.product = product;
        this.quantity = quantity;
        this.salePrice = salePrice;
        this.employee = employee;
        this.totalPrice = totalPrice;
        this.buyerName = buyerName;
        this.buyerEmail = buyerEmail;
        this.buyerNumber = buyerNumber;
        this.id = id;
    }

    public getProduct(): Product | null {
        return this.product;
    }

    public setProduct(product: Product | null): void {
        this.product = product;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        this.quantity = quantity;
    }

    public getSalePrice(): number {
        return this.salePrice;
    }

    public setSalePrice(salePrice: number): void {
        this.salePrice = salePrice;
    }

    public getEmployee(): Employee | null {
        return this.employee;
    }

    public setEmployee(employee: Employee | null): void {
        this.employee = employee;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }

    public getBuyerEmail(): string | undefined {
        return this.buyerEmail;
    }

    public setBuyerEmail(buyerEmail: string): void {
        this.buyerEmail = buyerEmail;
    }

    public getBuyerNumber(): string | undefined {
        return this.buyerNumber;
    }

    public setBuyerNumber(buyerNumber: string): void {
        this.buyerNumber = buyerNumber;
    }

    public getBuyerName(): string {
        return this.buyerName;
    }

    public setBuyerName(buyerName: string): void {
        this.buyerName = buyerName;
    }
    
    public getId(): string | undefined {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
}
