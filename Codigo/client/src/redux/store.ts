import { configureStore } from "@reduxjs/toolkit";
import sliceFunctionality from "./functionality/sliceFunctionality";


const store = configureStore({
    reducer: {
        products: sliceFunctionality,
    }
})

export default store;