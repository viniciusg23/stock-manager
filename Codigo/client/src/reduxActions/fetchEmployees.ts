import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewEmployees } from "../api/employees";

export const fetchEmployees = createAsyncThunk('employees/fetchEmployees', async () => {
    return await viewEmployees();
});