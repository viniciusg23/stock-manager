import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployees } from "../../reduxActions/fetchEmployees";
import { Employee } from "../../entities/Employee";

interface ISliceEmployeesState {
    employees: Employee[];
    loading: boolean
    error: string | undefined;
}

const INITIAL_STATE: ISliceEmployeesState = {
    employees: [],
    loading: false,
    error: "" 
};
  

const sliceEmployees = createSlice({
    name: "employees",
    initialState: INITIAL_STATE,
    reducers: {
        search(state, { payload }: PayloadAction<string>) {
            const query = payload.toLowerCase();
            state.employees = state.employees.filter((employee) => {
                return employee.name.toLowerCase().includes(query);
            });
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployees.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(fetchEmployees.fulfilled, (state, action) => {
            state.loading = false;
            state.employees = action.payload;
        })
        builder.addCase(fetchEmployees.rejected, (state, action) => {
            state.loading = false;
            state.employees = [];
            state.error = action.error.message;
        });
    },
      
});

export default sliceEmployees.reducer;

export const { search } = sliceEmployees.actions;

export const useEmployees = (state: any): ISliceEmployeesState => {
    return state.employees as ISliceEmployeesState;
}