import { Category } from "../entities/Category";

export async function viewCategories(): Promise<Category[]> {
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    };

    const response = await fetch("/category/view", options);
    const data = await response.json();

    return data.categories;
}