import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Category } from "../../entities/Category";
import { fetchCategories } from "../../reduxActions/fetchCategories";

interface ISliceCategoriesState {
    categories: Category[];
    loading: boolean
    error: string | undefined;
}

const INITIAL_STATE: ISliceCategoriesState = {
    categories: [],
    loading: false,
    error: "" ,
};
  

const sliceCategories = createSlice({
    name: "categories",
    initialState: INITIAL_STATE,
    reducers: {
        search(state, { payload }: PayloadAction<string>) {
            const query = payload.toLowerCase();
            state.categories = state.categories.filter((category) => {
                return category.name.toLowerCase().includes(query);
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        })
        builder.addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.categories = [];
            state.error = action.error.message;
        });
    },
      
});

export default sliceCategories.reducer;

export const { search } = sliceCategories.actions;

export const useCategories = (state: any): ISliceCategoriesState => {
    return state.categories as ISliceCategoriesState;
}