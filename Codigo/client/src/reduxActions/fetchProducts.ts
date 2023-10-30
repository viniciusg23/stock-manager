import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewProducts } from "../api/products";

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    return await viewProducts();
});