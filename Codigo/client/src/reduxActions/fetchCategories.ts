import { createAsyncThunk } from "@reduxjs/toolkit";
import { viewCategories } from "../api/categories";

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
    return await viewCategories();
});