import { Employee } from "../entities/Employee";

export async function viewEmployees(): Promise<Employee[]> {
    const options = {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    };

    const response = await fetch("/employee/view", options);
    const data = await response.json();

    return data.employees;
}