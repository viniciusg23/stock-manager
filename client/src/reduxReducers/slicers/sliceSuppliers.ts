import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Supplier } from "../../entities/Supplier";
import { fetchSuppliers } from "../../reduxActions/fetchSuppliers";

interface ISliceSuppliersState {
    suppliers: Supplier[];
    loading: boolean
    error: string | undefined;
}

const INITIAL_STATE: ISliceSuppliersState = {
    suppliers: [],
    loading: false,
    error: "" ,
};
  

const sliceSuppliers = createSlice({
    name: "suppliers",
    initialState: INITIAL_STATE,
    reducers: {
        search(state, { payload }: PayloadAction<string>) {
            const query = payload.toLowerCase();
            state.suppliers = state.suppliers.filter((supplier) => {
                return supplier.name.toLowerCase().includes(query);
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchSuppliers.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchSuppliers.fulfilled, (state, action) => {
            state.loading = false;
            state.suppliers = action.payload;
        })
        builder.addCase(fetchSuppliers.rejected, (state, action) => {
            state.loading = false;
            state.suppliers = [];
            state.error = action.error.message;
        });
    },
      
});

export default sliceSuppliers.reducer;

export const { search } = sliceSuppliers.actions;

export const useSuppliers = (state: any): ISliceSuppliersState => {
    return state.suppliers as ISliceSuppliersState;
}