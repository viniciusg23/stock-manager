export interface IEditProductDTO {
    id: string;
    category: string;
    name: string;
    quantity: number;
    costPrice: number;
    salePrice: number;
    purchaseMonth: number;
    purchaseYear: number;
    supplier: string;
}