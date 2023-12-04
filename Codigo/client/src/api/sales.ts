import { Sale } from "../entities/Sale";
import { getAuthorizationToken } from "../utils/getAuthorizationToken";

export async function registerSell(body: string){

    const options = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: body
    };
                  
    const response = await fetch("/sale/sell", options);
    const data = await response.json();


    if(!response.ok){
        throw new Error(data.message);
    }


    return data;
}

export async function viewSales(): Promise<Sale[]> {
    const options = {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${getAuthorizationToken()}` },
    };

    const response = await fetch("/sale/view", options);
    const data = await response.json();

    return data.sales;
}

