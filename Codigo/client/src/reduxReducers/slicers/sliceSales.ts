import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchSales } from "../../reduxActions/fetchSales";
import { Sale } from "../../entities/Sale";

interface ISliceSalesState {
    sales: Sale[];
    loading: boolean
    error: string | undefined;
}

const INITIAL_STATE: ISliceSalesState = {
    sales: [],
    loading: false,
    error: "" ,
};
  

const sliceSales = createSlice({
    name: "sales",
    initialState: INITIAL_STATE,
    reducers: {
        updateSales(state, { payload }: PayloadAction<Sale[]>) {
            state.sales = payload;
        },
        addSale(state, { payload }: PayloadAction<Sale>) {
            state.sales.push(payload);
        },
        removeSale(state, { payload }: PayloadAction<Sale>) {
            state.sales = state.sales.filter(obj => obj.id !== payload.id);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSales.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSales.fulfilled, (state, action) => {
            state.loading = false;
            state.sales = action.payload;
        })
        builder.addCase(fetchSales.rejected, (state, action) => {
            state.loading = false;
            state.sales = [];
            state.error = action.error.message;
        });
    },
      
});

export default sliceSales.reducer;

export const { updateSales, addSale, removeSale } = sliceSales.actions;

export const useSales = (state: any): ISliceSalesState => {
    return state.sales as ISliceSalesState;
}