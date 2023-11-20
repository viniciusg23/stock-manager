import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewSales } from "../api/sales";

export const fetchSales = createAsyncThunk("suppliers/fetchSuppliers", async () => {
    return await viewSales();
});