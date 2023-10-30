import { Supplier } from "../entities/supplier/Supplier";

export async function viewSuppliers(): Promise<Supplier[]> {
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    };

    const response = await fetch("/supplier/view", options);
    const data = await response.json();

    return data.suppliers;
}