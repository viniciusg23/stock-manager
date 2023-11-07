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
        updateCategories(state, { payload }: PayloadAction<Category[]>) {
            state.categories = payload;
        },
        addCategory(state, { payload }: PayloadAction<Category>) {
            state.categories.push(payload);
        },
        removeCategory(state, { payload }: PayloadAction<Category>) {
            state.categories = state.categories.filter(obj => obj.id !== payload.id);
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

export const { updateCategories, addCategory, removeCategory } = sliceCategories.actions;

export const useCategories = (state: any) => {
    return state.categories as ISliceCategoriesState;
}