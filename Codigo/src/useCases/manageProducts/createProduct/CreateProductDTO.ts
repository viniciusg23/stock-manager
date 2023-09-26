export interface ICreateProductRequestDTO {
    isFiscal: boolean;
    category: string;
    name: string;
    quantity: number;
    costPrice: number;
    salePrice: number;
    purchaseMonth: number;
    purchaseYear: number;
    supplier: string;
}