import { getAuthorizationToken } from "../pages/home/utils/getAuthorizationToken";

type TotalProfitResponse = string;
export async function totalProfit(): Promise<TotalProfitResponse> {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}` },
    };

    const response = await fetch("/etl/total-profit", options)
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.result;
}


type PercentageOfSalesByCategoryResponse = {category: string, percentage: number};
export async function percentageOfSalesByCategory(): Promise<PercentageOfSalesByCategoryResponse[]> {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}` },
    };

    const response = await fetch("/etl/percentage-sales-category", options)
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.result;
}


type TotalSaleByEmployeeResponse = {employee: string, totalSale: number}
export async function totalSaleByEmployee(): Promise<TotalSaleByEmployeeResponse[]> {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}` },
    };

    const response = await fetch("/etl/total-profit-employee", options)
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return data.result;
}