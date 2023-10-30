import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slicers/sliceProducts";
import suppliersReducer from "./slicers/sliceSuppliers";
import employeesReducer from "./slicers/sliceEmployees";

const store = configureStore({
    reducer: {
        products: productsReducer,
        suppliers: suppliersReducer,
        employees: employeesReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export default store;