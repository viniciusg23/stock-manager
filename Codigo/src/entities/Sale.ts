export class Sale {
    private productId: string;
    private quantity: number;
    private salePrice: number;
    private employeeId: string;
    private totalPrice: number;
    private buyerName: string;
    private id?: string;
    private buyerEmail?: string;
    private buyerNumber?: string;


    public constructor(
        productId: string,
        quantity: number,
        salePrice: number,
        employeeId: string,
        totalPrice: number,
        buyerName: string,
        buyerEmail?: string,
        buyerNumber?: string,
        id?: string
    ) {
        this.productId = productId;
        this.quantity = quantity;
        this.salePrice = salePrice;
        this.employeeId = employeeId;
        this.totalPrice = totalPrice;
        this.buyerName = buyerName;
        this.buyerEmail = buyerEmail;
        this.buyerNumber = buyerNumber;
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
