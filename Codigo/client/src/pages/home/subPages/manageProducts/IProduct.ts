export interface IProduct {
    id: string;
    code: string;
    isFiscal: boolean;
    category: string;
    name: string;
    quantity: number;
    costPrice: number;
    salePrice: number;
    purchaseMonth: "Janeiro" | "Fevereiro" | "Marco" | "Abril" | "Maio" | "Junho" | "Julho" | "Agosto" | "Setembro" | "Outubro" | "Novembro" | "Dezembro";
    purchaseYear: number;
    supplier: string;
}