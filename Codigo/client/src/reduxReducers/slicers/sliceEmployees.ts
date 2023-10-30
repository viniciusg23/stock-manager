import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchEmployees } from "../../reduxActions/fetchEmployees";
import { Employee } from "../../entities/employee/Employee";

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
        updateEmployees(state, { payload }: PayloadAction<Employee[]>) {
            state.employees = payload;
        },
        addEmployee(state, { payload }: PayloadAction<Employee>) {
            state.employees.push(payload);
        },
        removeEmployee(state, { payload }: PayloadAction<Employee>) {
            state.employees = state.employees.filter(obj => obj.id !== payload.id);
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

export const { updateEmployees, addEmployee, removeEmployee } = sliceEmployees.actions;

export const useEmployees = (state: any) => {
    return state.employees as ISliceEmployeesState;
}