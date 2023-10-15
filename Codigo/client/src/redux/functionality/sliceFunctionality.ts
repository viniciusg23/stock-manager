import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE: string = "";

const sliceFunctionality = createSlice({
    name: "functionality",
    initialState: INITIAL_STATE,
    reducers: {
        updateFunctionality(state, {payload}: PayloadAction<string>){
            return payload;
        }
    }
})

export default sliceFunctionality.reducer;

export const { updateFunctionality } = sliceFunctionality.actions;

export const useFunctionality = (state: any) => {
    return state.functionality as string;
}