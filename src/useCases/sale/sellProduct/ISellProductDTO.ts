export interface ISellProductDTO {
    productId: string;
	quantity: number;
	salePrice: number;
	employeeId: string;
	systemPassword: string;
	buyerName: string;
	buyerEmail?: string;
	buyerNumber?: string;
}