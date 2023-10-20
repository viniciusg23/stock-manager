export class Sale {
    private productId: string;
    private quantity: number;
    private salePrice: number;
    private employeeId: string;
    private totalPrice: number;
    private id?: string;

    public constructor(
        productId: string,
        quantity: number,
        salePrice: number,
        employeeId: string,
        totalPrice: number,
        id?: string
    ) {
        this.productId = productId;
        this.quantity = quantity;
        this.salePrice = salePrice;
        this.employeeId = employeeId;
        this.totalPrice = totalPrice;
        this.id = id;
    }

    public getProductId(): string {
        return this.productId;
    }

    public setProductId(productId: string): void {
        this.productId = productId;
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

    public getEmployeeId(): string {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: string): void {
        this.employeeId = employeeId;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public setTotalPrice(totalPrice: number): void {
        this.totalPrice = totalPrice;
    }
}
