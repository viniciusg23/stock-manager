import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slicers/sliceProducts";
import suppliersReducer from "./slicers/sliceSuppliers";
import employeesReducer from "./slicers/sliceEmployees";
import categoriesReducer from "./slicers/sliceCategories";
import salesReducer from "./slicers/sliceSales";

const store = configureStore({
    reducer: {
        products: productsReducer,
        suppliers: suppliersReducer,
        employees: employeesReducer,
        categories: categoriesReducer,
        sales: salesReducer
    }
})

export type AppDispatch = typeof store.dispatch;

export default store;