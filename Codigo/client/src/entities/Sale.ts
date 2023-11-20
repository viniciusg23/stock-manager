import { Employee } from "./Employee";
import { Product } from "./Product";

export class Sale {
    public product: Product | null;
    public quantity: number;
    public salePrice: number;
    public employee: Employee | null;
    public totalPrice: number;
    public buyerName: string;
    public id?: string;
    public buyerEmail?: string;
    public buyerNumber?: string;


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

    }
