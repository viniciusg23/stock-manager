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
        updateProducts(state, { payload }: PayloadAction<Product[]>) {
            state.products = payload;
        },
        addProduct(state, { payload }: PayloadAction<Product>) {
            state.products.push(payload);
        },
        removeProduct(state, { payload }: PayloadAction<Product>) {
            state.products = state.products.filter(obj => obj.id !== payload.id);
        }
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

export const { updateProducts, addProduct, removeProduct } = sliceProducts.actions;

// export { fetchProducts };

export const useProducts = (state: any): ISliceProductsState => {
    return state.products as ISliceProductsState;
}