import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../../entities/Product";
import { fetchProducts } from "../../reduxActions/fetchProducts";

interface ISliceProductsState {
    [key: string]: any;
    products: Product[];
    loading: boolean
    error: string | undefined;
}

const INITIAL_STATE: ISliceProductsState = {
    products: [],
    loading: false,
    error: "" ,
};
  

const sliceProducts = createSlice({
    name: "products",
    initialState: INITIAL_STATE,
    reducers: {
        search(state, { payload }: PayloadAction<string>) {
            const query = payload.toLowerCase();
            state.products = state.products.filter((product) => {
                // Aqui você pode ajustar a lógica de comparação conforme necessário
                return product.name.toLowerCase().includes(query);
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchProducts.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.products = [];
            state.error = action.error.message;
        });
    },
      
});

export default sliceProducts.reducer;

export const { search } = sliceProducts.actions;

export const useProducts = (state: any): ISliceProductsState => {
    return state.products as ISliceProductsState;
}