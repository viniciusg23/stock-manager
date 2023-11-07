import { Product } from "../entities/Product";

export async function viewProducts(): Promise<Product[]> {
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    };

    const response = await fetch("/product/view", options);
    const data = await response.json();

    return data.products
}