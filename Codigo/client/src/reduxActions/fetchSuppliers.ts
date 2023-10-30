import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewSuppliers } from "../api/suppliers";

export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
    return await viewSuppliers();
});